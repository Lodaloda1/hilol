import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { AdminOperations } from './admin-operations'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user || session.user.email !== 'hardik_10@hilol.local') redirect('/sign-in')
  const initialOrders = await db.select().from(orders).orderBy(desc(orders.createdAt))
  return <main className="admin-page"><header className="admin-header"><div><p className="eyebrow">HILOL / PRIVATE</p><h1>orders.</h1></div><form action="/api/admin/sign-out" method="post"><button className="button">Sign out</button></form></header><section className="admin-orders-section"><AdminOperations initialOrders={initialOrders} /></section></main>
}
