import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { canTransition, orderStatus } from '@/lib/order-validation'
import { ADMIN_EMAIL } from '@/lib/admin'

async function isAdmin() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.email === ADMIN_EMAIL }
export async function GET() { if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await db.select().from(orders).orderBy(desc(orders.createdAt))) }
export async function PATCH(request: Request) { if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await request.json().catch(() => null); const parsedStatus = orderStatus.safeParse(body?.status); if (!body?.id || !parsedStatus.success) return NextResponse.json({ error: 'Invalid order update' }, { status: 400 }); const current = await db.select({ status: orders.status }).from(orders).where(eq(orders.id, body.id)); if (!current[0] || !canTransition(current[0].status, parsedStatus.data)) return NextResponse.json({ error: 'Invalid order transition' }, { status: 400 }); const updated = await db.update(orders).set({ status: parsedStatus.data, updatedAt: new Date() }).where(eq(orders.id, body.id)).returning(); return NextResponse.json(updated[0] ?? null) }
