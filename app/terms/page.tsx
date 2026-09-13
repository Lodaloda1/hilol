import Link from 'next/link'

const sections = [
  ['1. Acceptance', 'These Terms govern your use of the HILOL website and purchases from HILOL. By using the site, you agree to them.'],
  ['2. Products and intellectual property', 'HILOL sells made-to-order clothing. HILOL and its licensors retain all rights in the HILOL name, artwork, designs, copy, and website. You may purchase products for personal use and may not copy or commercially reuse our designs.'],
  ['3. Pricing and payment', 'All prices are in Indian rupees. Taxes are included as applicable, and shipping is prepaid and included in the displayed price. Payment is completed through the available payment provider before an order enters production.'],
  ['4. Orders and fulfillment', 'Product availability, sizing, colors, and delivery estimates are shown on the relevant product page. Orders are printed or fulfilled after payment and may be subject to availability or serviceability.'],
  ['5. Cancellations, returns, and refunds', 'Cancellation is available only within 6 hours of placing an order, before printing begins. After that window, orders cannot be changed or cancelled. Returns or replacements are limited to damaged, defective, incorrect, or undelivered orders under the Refunds and Shipping policies.'],
  ['6. Responsible use', 'Do not misuse the website, interfere with its operation, submit unlawful material, or attempt to access another person’s information.'],
  ['7. Disclaimers and liability', 'The site and delivery estimates are provided with reasonable care. To the extent permitted by law, HILOL is not liable for indirect losses. Nothing here limits rights that cannot legally be limited.'],
  ['8. Governing law', 'These Terms are governed by the laws of India. Courts in India will have jurisdiction over disputes, subject to applicable consumer protections.'],
]

export default function TermsPage() { return <main className="policy-page legal-page"><Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link><Link className="policy-back" href="/">← Back</Link><span className="eyebrow">LEGAL / TERMS</span><h1>Terms of<br />service.</h1><p className="policy-lede">Wear your humor responsibly. Last updated: 2026.</p>{sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</main> }
