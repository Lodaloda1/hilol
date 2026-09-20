import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { timingSafeEqual } from 'node:crypto'

const ADMIN_EMAIL = 'hardik_10@hilol.local'
const safeEqual = (left: string, right: string) => { const a = Buffer.from(left); const b = Buffer.from(right); return a.length === b.length && timingSafeEqual(a, b) }

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const configuredPassword = process.env.ADMIN_PASSWORD ?? ''
    if (!safeEqual(String(body.username ?? ''), 'HARDIK_10') || !safeEqual(String(body.password ?? ''), configuredPassword)) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    const existing = await auth.api.getSession({ headers: new Headers(request.headers) })
    if (existing?.user) return NextResponse.json({ ok: true })
    const result = await auth.api.signUpEmail({ body: { name: 'HARDIK_10', email: ADMIN_EMAIL, password: body.password } })
    if (result.error) return NextResponse.json({ error: 'Unable to create admin account' }, { status: 400 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to process request' }, { status: 400 })
  }
}
