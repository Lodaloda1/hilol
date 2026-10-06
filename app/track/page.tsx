'use client'

import { FormEvent, useState } from 'react'

const statuses = ['Order confirmed', 'Production', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

export default function TrackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [order, setOrder] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true) }
  return <main className="track-page"><p className="eyebrow">HILOL / ORDER TRACKING</p><h1>where&apos;s<br /><em>your fit?</em></h1><p className="track-lede">Enter your HILOL order ID and the email or phone used at checkout.</p><form className="track-form" onSubmit={submit}><label>Order ID<input required value={order} onChange={(event) => setOrder(event.target.value)} placeholder="HL1024" /></label><label>Email or phone<input required /></label><button className="button button-black" type="submit">TRACK ORDER</button></form>{submitted && <section className="tracking-card"><div className="tracking-card-head"><span>HILOL ORDER #{order.toUpperCase()}</span><b>PREPAID</b></div><div className="tracking-steps">{statuses.map((status, index) => <div className={`tracking-step ${index === 0 ? 'is-active' : ''}`} key={status}><span>{String(index + 1).padStart(2, '0')}</span><b>{status}</b>{index === 0 && <small>Awaiting production and courier updates.</small>}</div>)}</div><p className="tracking-disclaimer">Live courier tracking appears after your order is handed to the courier.</p></section>}</main>
}
