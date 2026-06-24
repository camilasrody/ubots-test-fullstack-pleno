import { Redis } from 'ioredis'

import { env } from '../config/env.js'

type QueueSetResponse = 'OK' | null

type QueueClient = {
  ping: () => Promise<string>
  rpush: (key: string, value: string) => Promise<number>
  lpop: (key: string) => Promise<string | null>
  del: (key: string) => Promise<number>
  get: (key: string) => Promise<string | null>
  set: (
    key: string,
    value: string,
    mode?: 'PX',
    duration?: number,
    policy?: 'NX'
  ) => Promise<QueueSetResponse>
  disconnect: () => void
}

class MemoryQueueClient implements QueueClient {
  private lists = new Map<string, string[]>()

  private locks = new Map<string, { value: string; expiresAt: number }>()

  async ping() {
    return 'PONG'
  }

  async rpush(key: string, value: string) {
    const list = this.lists.get(key) ?? []
    list.push(value)
    this.lists.set(key, list)
    return list.length
  }

  async lpop(key: string) {
    const list = this.lists.get(key) ?? []
    const value = list.shift() ?? null
    this.lists.set(key, list)
    return value
  }

  async del(key: string) {
    const deletedList = this.lists.delete(key)
    const deletedLock = this.locks.delete(key)
    return Number(deletedList || deletedLock)
  }

  async get(key: string) {
    const lock = this.locks.get(key)

    if (!lock) {
      return null
    }

    if (Date.now() > lock.expiresAt) {
      this.locks.delete(key)
      return null
    }

    return lock.value
  }

  async set(
    key: string,
    value: string,
    mode?: 'PX',
    duration?: number,
    policy?: 'NX'
  ) {
    const current = await this.get(key)

    if (policy === 'NX' && current) {
      return null
    }

    const expiresAt =
      mode === 'PX' && duration
        ? Date.now() + duration
        : Number.MAX_SAFE_INTEGER

    this.locks.set(key, { value, expiresAt })

    return 'OK'
  }

  disconnect() {}
}

class RedisQueueClient implements QueueClient {
  constructor(private readonly redis: Redis) {}

  async ping() {
    return this.redis.ping()
  }

  async rpush(key: string, value: string) {
    return this.redis.rpush(key, value)
  }

  async lpop(key: string) {
    return this.redis.lpop(key)
  }

  async del(key: string) {
    return this.redis.del(key)
  }

  async get(key: string) {
    return this.redis.get(key)
  }

  async set(
    key: string,
    value: string,
    mode?: 'PX',
    duration?: number,
    policy?: 'NX'
  ) {
    if (mode && duration && policy) {
      return this.redis.set(key, value, mode, duration, policy)
    }

    return this.redis.set(key, value)
  }

  disconnect() {
    this.redis.disconnect()
  }
}

const createQueueClient = () => {
  if (env.QUEUE_PROVIDER === 'memory') {
    return new MemoryQueueClient()
  }

  if (!env.REDIS_URL) {
    throw new Error('REDIS_URL is required when QUEUE_PROVIDER is redis')
  }

  return new RedisQueueClient(new Redis(env.REDIS_URL))
}

const queueClient = createQueueClient()

export default queueClient
