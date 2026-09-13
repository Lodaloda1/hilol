import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supportEmail = process.env.SUPPORT_EMAIL
  if (!supportEmail) return NextResponse.json({ error: 'Support is not configured' }, { status: 503 })

  const body = await request.json().catch(() => null)
  if (!body?.contact || !body?.message || !body?.category) return NextResponse.json({ error: 'Missing support details' }, { status: 400 })

  return NextResponse.json({ error: 'Support provider is not configured' }, { status: 503 })
}
