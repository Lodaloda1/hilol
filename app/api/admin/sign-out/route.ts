import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export async function POST(request: Request) {
  return toNextJsHandler(auth).POST(new Request(new URL('/api/auth/sign-out', request.url), { method: 'POST', headers: request.headers }))
}
