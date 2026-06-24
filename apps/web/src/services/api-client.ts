import { type ZodType } from 'zod'

const resolveApiUrl = () => {
  const candidate = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'
  const parsed = new URL(candidate)

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('VITE_API_URL must use http or https')
  }

  return parsed.toString().replace(/\/$/, '')
}

const API_URL = resolveApiUrl()

type RequestOptions = {
  method?: 'GET' | 'POST'
  body?: unknown
}

export const request = async <T>(
  path: string,
  schema: ZodType<T>,
  options?: RequestOptions
) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: options?.method ?? 'GET',
    mode: 'cors',
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : 'Nao foi possivel completar a requisicao'
    )
  }

  return schema.parse(payload)
}
