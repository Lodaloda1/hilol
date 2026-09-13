import { NextResponse } from 'next/server'

export async function GET() {
  if (!process.env.PRINTROVE_API_URL || !process.env.PRINTROVE_API_TOKEN) {
    return NextResponse.json({ error: 'Catalog is not configured' }, { status: 503 })
  }

  return NextResponse.json({ error: 'Printrove catalog sync is not configured' }, { status: 503 })
}
