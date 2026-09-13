import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) return NextResponse.json({ error: 'Payment is not configured' }, { status: 503 })
  return NextResponse.json({ error: 'Payment setup is incomplete' }, { status: 503 })
}
