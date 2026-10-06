import { jsonb, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', { id: text('id').primaryKey(), customerName: text('customerName').notNull(), customerEmail: text('customerEmail').notNull(), items: jsonb('items').notNull(), total: integer('total').notNull(), status: text('status').notNull(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull() })
