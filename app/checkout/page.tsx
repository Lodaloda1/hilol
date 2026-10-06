'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type CheckoutItem = { id: string; garmentId: string; variantId: string; name: string; size: string; color: string; meme: string; quantity: number; price: number }
type ShippingMethod = 'standard' | 'express'
type PaymentMethod = 'prepaid' | 'cod'

export default function CheckoutPage() {
  const [items, setItems] = useState<CheckoutItem[]>([])
  const [shipping, setShipping] = useState<ShippingMethod>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('prepaid')
  const [status, setStatus] = useState('')
  const [orderId, setOrderId] = useState('')
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])
  const expressFee = shipping === 'express' ? 40 : 0
  const codFee = payment === 'cod' ? 35 : 0
  const upfront = payment === 'cod' ? 80 : subtotal + expressFee
  const deliveryDue = payment === 'cod' ? subtotal + expressFee + codFee - 80 : 0
  const total = subtotal + expressFee + codFee

  useEffect(() => { try { const saved = window.localStorage.getItem('hilol-checkout'); if (saved) setItems(JSON.parse(saved) as CheckoutItem[]) } catch { setItems([]) } }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Creating secure order…')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customer: Object.fromEntries(form.entries()), items, shippingMethod: shipping, paymentMethod: payment }) })
    const result = await response.json()
    if (!response.ok) { setStatus(result.error ?? 'Unable to create order'); return }
    setOrderId(result.orderId)
    setStatus('Order created.')
    window.localStorage.removeItem('hilol-checkout')
  }

  if (orderId) return <main className="checkout-page"><p className="eyebrow">HILOL / ORDER CONFIRMED</p><h1>order<br /><em>received.</em></h1><p className="checkout-note">HILOL order {orderId} has been recorded. {payment === 'cod' ? `₹${upfront} paid upfront. ₹${deliveryDue} is due at delivery.` : `₹${total} paid online.`}</p><Link className="button button-black" href={`/track?order=${orderId}`}>TRACK ORDER</Link></main>

  return <main className="checkout-page"><header className="checkout-header"><Link className="text-link" href="/">← SHOP</Link><span className="eyebrow">SECURE CHECKOUT</span></header><div className="checkout-layout"><section><p className="eyebrow">ORDER DETAILS</p><h1>checkout<br /><em>clean.</em></h1><form className="checkout-form" onSubmit={submit}><fieldset><legend>SHIPPING METHOD</legend><label className="checkout-option"><input type="radio" name="shipping" checked={shipping === 'standard'} onChange={() => setShipping('standard')} /><span><b>STANDARD DELIVERY</b><small>Delhivery Surface · Included · Estimated 4–5 days</small></span></label><label className="checkout-option"><input type="radio" name="shipping" checked={shipping === 'express'} onChange={() => setShipping('express')} /><span><b>EXPRESS DELIVERY · +₹40</b><small>BlueDart Express Air · Approximately 1–2 days faster</small></span></label></fieldset><fieldset><legend>PAYMENT METHOD</legend><label className="checkout-option"><input type="radio" name="payment" checked={payment === 'prepaid'} onChange={() => setPayment('prepaid')} /><span><b>PREPAID</b><small>Pay the full amount online.</small></span></label><label className="checkout-option"><input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} /><span><b>COD</b><small>₹80 upfront via UPI · ₹35 COD fee · balance at delivery.</small></span></label></fieldset><fieldset><legend>DELIVERY INFORMATION</legend><label>Name<input name="name" required autoComplete="name" /></label><label>Phone<input name="phone" required inputMode="tel" autoComplete="tel" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label><label>Address<input name="address" required autoComplete="street-address" /></label><div className="checkout-two"><label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{6}" /></label><label>City<input name="city" required autoComplete="address-level2" /></label></div><label>State<input name="state" required autoComplete="address-level1" /></label></fieldset><button className="button button-black" type="submit" disabled={!items.length}>{items.length ? `PLACE ORDER / PAY ₹${upfront}` : 'CART IS EMPTY'}</button>{status && <p className="auth-error" role="status">{status}</p>}</form></section><aside className="order-summary"><p className="eyebrow">ORDER SUMMARY</p>{items.length ? items.map((item) => <div className="summary-line" key={item.id}><span>{item.name}<small>{item.size} / {item.color} / {item.meme} × {item.quantity}</small></span><strong>₹{item.price * item.quantity}</strong></div>) : <p>Your cart is empty. Add something first.</p>}<div className="summary-line"><span>Shipping</span><strong>{expressFee ? '₹40' : 'Included'}</strong></div>{payment === 'cod' && <div className="summary-line"><span>COD fee</span><strong>₹35</strong></div>}<div className="summary-total"><span>Customer total</span><strong>₹{total}</strong></div>{payment === 'cod' ? <><div className="summary-line"><span>Paid now via UPI</span><strong>₹{upfront}</strong></div><div className="summary-total"><span>Due at delivery</span><strong>₹{deliveryDue}</strong></div></> : <small>Standard shipping is included. No surprise charges.</small>}</aside></div></main>
}
