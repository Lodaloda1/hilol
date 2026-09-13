import { NextResponse } from 'next/server'

export async function POST() {
  if (!process.env.OTP_PROVIDER || !process.env.OTP_API_KEY || !process.env.OTP_API_SECRET) return NextResponse.json({ error: 'Verification is not configured' }, { status: 503 })
  return NextResponse.json({ error: 'Verification provider is not configured' }, { status: 503 })
}
