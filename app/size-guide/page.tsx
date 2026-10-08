'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const regularChart = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-FFC3E8F5-plshO9leBs3EJb520hSUwzaVWrNtex.jpeg'
const oversizedChart = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-03AF00F9-YtFUwslfUUp9LD49XKgq7SZxXYjHTJ.jpeg'
function ScrollToSection({ id, product }: { id: string; product: string | null }) { useEffect(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [id, product]); return null }

export default function SizeGuidePage() {
  const [targetId, setTargetId] = useState<string>()
  const [product, setProduct] = useState<string | null>(null)
  useEffect(() => { const params = new URLSearchParams(window.location.search); const fit = params.get('fit'); setProduct(params.get('product')); setTargetId(fit === 'regular' ? 'standard-fit' : fit === 'oversized' ? 'oversized-fit' : undefined) }, [])
  return <main className="size-guide-page">
    <header className="size-guide-header"><Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-3BAD8F86-Q8SLACnZHelb6sPUGVFRue6bKxvbvR.jpeg" alt="HILOL — wear your humor" /></Link><Link className="policy-back" href="/">BACK TO HILOL</Link></header>
    <div className="size-guide-intro"><span className="eyebrow">KNOW YOUR ORDER</span><h1>SIZE<br /><em>GUIDE</em></h1><p>Check your measurements before ordering. Different fits use different charts.</p></div>
    {targetId && <ScrollToSection id={targetId} product={product} />}
    <section id="standard-fit" className="size-guide-section"><span className="eyebrow">STANDARD / REGULAR FIT</span><h2>180 GSM ROUND NECK TEE</h2><img src={regularChart} alt="HILOL standard fit size chart for the 180 GSM unisex regular round neck tee" /></section>
    <section id="oversized-fit" className="size-guide-section oversized-guide"><span className="eyebrow">OVERSIZED / DROP-SHOULDER</span><h2>220 GSM NORMAL · 240 GSM PREMIUM · 240 GSM ACID WASH</h2><img src={oversizedChart} alt="HILOL oversized fit size chart for the 220 GSM and 240 GSM drop-shoulder tees" /></section>
    <section className="measure-section"><span className="eyebrow">BEFORE YOU CHECK OUT</span><h2>COMPARE. THEN<br /><em>COMMIT.</em></h2><p>Lay a similar garment flat and compare chest, length, shoulder, and sleeve measurements with the applicable chart above. All measurements are in inches and may vary by ±1 inch.</p><strong>Because each garment is made for the selected order, customer-selected wrong sizes are not ordinarily eligible for return or replacement.</strong><Link className="button button-black" href="/#shop">SHOP YOUR FIT <span aria-hidden="true">→</span></Link></section>
    <footer className="size-guide-footer"><Link href="/support">NEED HELP?</Link></footer>
  </main>
}
