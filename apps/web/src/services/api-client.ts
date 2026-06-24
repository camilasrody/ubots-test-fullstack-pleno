import { type ZodType } from 'zod'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

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
    headers: {
      'Content-Type': 'application/json',
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(
      payload.message ?? 'Nao foi possivel completar a requisicao'
    )
  }

  return schema.parse(payload)
}
