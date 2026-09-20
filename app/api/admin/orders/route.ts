import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'

async function isAdmin() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.email === 'hardik_10@hilol.local' }
export async function GET() { if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await db.select().from(orders).orderBy(desc(orders.createdAt))) }
export async function PATCH(request: Request) { if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const { id, status } = await request.json(); const allowed = ['pending','confirmed','processing','shipped','delivered','cancelled']; if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 }); const updated = await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id)).returning(); return NextResponse.json(updated[0] ?? null) }
