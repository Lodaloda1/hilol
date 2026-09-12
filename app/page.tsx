'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react'

const products = [
  { name: 'The Everyday Meme Tee', short: "Men's Round Neck", price: 449, gsm: '180 GSM', category: 'COMMON BALL', color: '#f4c6e6', copy: 'Your everyday uniform for questionable internet decisions. A lighter-weight everyday tee built to carry your favorite HILOL memes without trying too hard.', sizes: ['S','M','L','XL'], tags: ['Bio-washed','Pre-shrunk','Multiple colors'] },
  { name: 'The Slightly Extra V', short: "Men's V-Neck", price: 479, gsm: '180 GSM', category: 'MEME BALL', color: '#b9e8ff', copy: 'A meme, but slightly more V-neck than necessary. Easy everyday fit with the same HILOL brainrot.', sizes: ['S','M','L','XL','2XL'], tags: ['Same price through 2XL','Bio-washed'] },
  { name: 'Internet Access Long Sleeve', short: "Men's Long Sleeve", price: 489, gsm: '180 GSM', category: 'MEME BALL', color: '#d7f36b', copy: "For when a normal meme tee isn't enough and your arms also need internet access.", sizes: ['S','M','L','XL'], tags: ['Long sleeve','Pre-shrunk'] },
  { name: 'More Fabric, More Meme', short: 'Normal Oversized Tee', price: 549, gsm: '220 GSM', category: 'ELITE BALL KNOWLEDGE', color: '#ff9c83', copy: 'More fabric. More space for the meme. More streetwear energy.', sizes: ['S','M','L','XL','2XL'], tags: ['Boxy silhouette','Same price through 2XL'] },
  { name: 'The Heavyweight Member', short: 'Premium Oversized Tee', price: 599, gsm: '240 GSM', category: 'ELITE BALL KNOWLEDGE', color: '#b9a7ff', copy: '240 GSM French Terry Loop Knit Unbrushed fabric meets HILOL brainrot. The heavyweight member of the family.', sizes: ['S','M','L','XL','2XL'], tags: ['240 GSM','100% combed cotton where applicable'] },
  { name: 'Winter Mode Activated', short: 'Sweatshirt', price: 659, gsm: '320 GSM', category: 'MEME BALL', color: '#ffdf61', copy: 'Your meme just entered winter mode.', sizes: ['S','M','L','XL'], tags: ['320 GSM','Bio-washed','Pre-shrunk'] },
  { name: 'Meme For Every Situation', short: 'Regular Hoodie', price: 759, gsm: '320 GSM', category: 'ELITE BALL KNOWLEDGE', color: '#96e0cf', copy: 'A hoodie for people who somehow have a meme for every situation.', sizes: ['S','M','L','XL'], tags: ['Matching drawstrings where applicable','320 GSM'] },
  { name: 'Maximum Hoodie', short: 'Oversized Hoodie', price: 869, gsm: '320 GSM', category: 'ELITE BALL KNOWLEDGE', color: '#ffabcf', copy: 'Maximum hoodie. Maximum meme.', sizes: ['S','M','L','XL','2XL'], tags: ['Oversized fit','Same price through 2XL'] },
  { name: 'No Meme. Just Vibes.', short: 'Joggers', price: 599, gsm: '240 GSM', category: 'NO BRAIN REQUIRED', color: '#d8d8d8', copy: 'No meme.\nJust vibes.', sizes: ['S','M','L','XL','2XL'], tags: ['Plain joggers','No meme printing','Relaxed tapered silhouette'] },
  { name: 'We Tried.', short: 'Shorts', price: 529, gsm: '240 GSM', category: 'NO BRAIN REQUIRED', color: '#8ec6ff', copy: 'No meme here.\nWe tried.', sizes: ['S','M','L','XL','2XL'], tags: ['Plain shorts','No meme printing'] },
  { name: 'Your Favorite Meme', short: "Women's Round Neck", price: 449, gsm: '180 GSM', category: 'COMMON BALL', color: '#ffb27c', copy: 'Your favorite meme. Your fit.', sizes: ['S','M','L','XL'], tags: ['Everyday fit','Bio-washed where applicable'] },
  { name: 'Smaller Canvas', short: "Women's Crop Top", price: 379, gsm: '180 GSM', category: 'MEME BALL', color: '#f4a2d0', copy: 'Smaller canvas.\nSame brainrot.', sizes: ['S','M','L','XL'], tags: ['Crop silhouette','Pre-shrunk where applicable'] },
  { name: 'Full Internet Damage', short: "Women's Crop Hoodie", price: 699, gsm: '320 GSM', category: 'ELITE BALL KNOWLEDGE', color: '#a7d9ff', copy: 'Crop hoodie. Full internet damage.', sizes: ['S','M','L'], tags: ['320 GSM where applicable','Maximum size L'] },
]

function Sticker({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`sticker ${className}`}>{children}</span>
}

function ProductVisual({ product, large = false }: { product: typeof products[number]; large?: boolean }) {
  return <div className={`product-visual ${large ? 'product-visual-large' : ''}`} style={{ background: product.color }}>
    <div className="visual-noise" />
    <span className="visual-brand">hi lol.</span>
    <span className="visual-meme">{product.short === 'Joggers' || product.short === 'Shorts' ? 'NO MEME' : 'very online'}</span>
    <div className="tee-shape"><div className="tee-neck" /><div className="tee-print">LOL<br /><small>IRL</small></div></div>
    <span className="visual-label">{product.gsm}</span>
  </div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selected, setSelected] = useState<typeof products[number] | null>(null)
  const [cart, setCart] = useState<{ product: typeof products[number]; size: string; qty: number }[]>([])
  const [level, setLevel] = useState('MEME BALL')
  const [damage, setDamage] = useState(72)
  const [faq, setFaq] = useState<number | null>(null)
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0), [cart])

  function add(product: typeof products[number], size = product.sizes[0]) {
    setCart((items) => {
      const found = items.find((item) => item.product.name === product.name && item.size === size)
      return found ? items.map((item) => item === found ? { ...item, qty: item.qty + 1 } : item) : [...items, { product, size, qty: 1 }]
    })
    setSelected(null)
    setCartOpen(true)
  }

  return <main className="site-shell">
    <div className="top-strip"><span>SHIPPING INCLUDED</span><span className="top-dots">● ● ●</span><span>MADE WHEN YOU ORDER</span></div>
    <header className="site-nav">
      <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
      <a className="logo" href="#top">hi lol<span>.</span></a>
      <nav className="desktop-nav">{['SHOP','MEMES','OVERSIZED','HOODIES','WOMEN','ABOUT'].map((item) => <a key={item} href={item === 'SHOP' ? '#shop' : `#${item.toLowerCase()}`}>{item}</a>)}</nav>
      <div className="nav-actions"><a href="/track" className="track-link">TRACK ORDER</a><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Cart with ${cart.length} items`}><ShoppingBag size={19} /><span>{cart.reduce((n, i) => n + i.qty, 0)}</span></button></div>
    </header>

    {menuOpen && <div className="mobile-menu"><button className="close-button" onClick={() => setMenuOpen(false)}><X /></button><span className="menu-kicker">THE MENU, BUT MAKE IT LOUD</span>{['SHOP','MEMES','OVERSIZED','HOODIES','WOMEN','ABOUT'].map((item, i) => <a key={item} href={item === 'SHOP' ? '#shop' : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}><b>0{i + 1}</b>{item}<ArrowRight /></a>)}<a className="menu-track" href="/track">TRACK ORDER <ArrowRight /></a></div>}

    <section id="top" className="hero-section">
      <div className="hero-copy"><Sticker className="sticker-top">INDIAN INTERNET WEAR</Sticker><h1>hi<br /><span>lol.</span></h1><p className="hero-tagline">wear your humor.</p><p className="hero-sub">you already spent 6 hours looking at memes today.<br />might as well wear one.</p><div className="hero-actions"><a className="button button-black" href="#shop">SHOP MEMES <ArrowRight size={17} /></a><a className="scroll-link" href="#brainrot">SCROLL THE BRAINROT <ArrowDown size={16} /></a></div></div>
      <div className="hero-art"><div className="scribble">LOL<br />IRL</div><div className="hero-shirt"><div className="tee-neck" /><div className="tee-print">BRB<br /><small>BEING<br />ICONIC</small></div></div><Sticker className="sticker-corner">100%<br />UNSERIOUS</Sticker><span className="hero-star">✳</span><span className="hero-arrow">↘</span></div>
      <div className="hero-bottom"><span>SCROLL IF YOU DARE</span><span>↓</span><span>EST. 2024 / INDIA</span></div>
    </section>

    <div className="marquee marquee-yellow"><div>WEAR YOUR HUMOR <span>✳</span> WEAR YOUR HUMOR <span>✳</span> WEAR YOUR HUMOR <span>✳</span> WEAR YOUR HUMOR <span>✳</span></div></div>

    <section id="brainrot" className="brainrot-section section-pad"><div className="section-head"><span className="eyebrow">01 / ENTER THE UNIVERSE</span><h2>SHOP THE<br /><em>BRAINROT</em></h2><p>not a catalog. a personality test with sleeves.</p></div><div className="level-switcher">{['COMMON BALL','MEME BALL','ELITE BALL KNOWLEDGE'].map((item, i) => <button className={level === item ? 'active' : ''} key={item} onClick={() => setLevel(item)}><span>0{i + 1}</span>{item}<small>{i === 0 ? "You've definitely seen this." : i === 1 ? "You've spent enough time online." : '18 hours of doomscrolling required.'}</small></button>)}</div><div className="level-result"><div className="result-stamp">{level === 'COMMON BALL' ? 'normie but cute' : level === 'MEME BALL' ? 'chronically online' : 'touch grass? never heard of her'}</div><p>{level === 'COMMON BALL' ? 'The gateway drug. Recognisable, wearable, still funny.' : level === 'MEME BALL' ? 'The sweet spot. Your group chat has lore.' : 'For the ones who reference a meme in a work meeting.'}</p><ArrowRight /></div></section>

    <section id="shop" className="featured-section section-pad"><div className="section-head row-head"><div><span className="eyebrow">02 / THE DROP</span><h2>FRESH <em>FROM<br />THE GROUP CHAT</em></h2></div><a href="#all-products" className="text-link">SEE ALL 13 <ArrowRight size={16} /></a></div><div className="product-scroller">{products.slice(0, 5).map((product, i) => <article className="product-card" key={product.name} onClick={() => setSelected(product)}><div className="product-number">0{i + 1}</div><ProductVisual product={product} /><div className="product-info"><div><span className="product-category">{product.category}</span><h3>{product.name}</h3></div><strong>₹{product.price}</strong></div><div className="product-hover">TAP TO<br />UNLOCK <ArrowRight size={17} /></div></article>)}</div></section>

    <section id="oversized" className="fit-section"><div className="fit-copy"><span className="eyebrow">03 / FIT CHECK</span><h2>WHICH<br /><em>FIT ARE<br />YOU?</em></h2><p>There is no wrong answer. Except polo. We don't do polo.</p><div className="fit-options"><button className="active">I LIKE IT NORMAL</button><button>I LIKE IT LOUD</button><button>I AM THE MEME</button></div></div><div className="fit-art"><div className="fit-circle">{damage}%<small>ONLINE</small></div><label htmlFor="damage">RATE YOUR INTERNET DAMAGE</label><input id="damage" type="range" min="0" max="100" value={damage} onChange={(e) => setDamage(Number(e.target.value))} /><div className="fit-ticks"><span>touches grass</span><span>no thoughts</span><span>terminally online</span></div></div></section>

    <section id="hoodies" className="quality-section section-pad"><div className="quality-title"><span className="eyebrow">04 / RECEIPTS</span><h2>WHY THE<br /><em>FUCK IS IT<br />THIS PRICE?</em></h2><Sticker>NO MARKETING<br />FLUFF</Sticker></div><div className="quality-grid"><div className="quality-intro"><p>Because good basics should not require a financial crisis. We make when you order, keep the middlemen weirdly minimal, and tell you exactly what you are getting.</p><a href="#quality-details" className="button button-yellow">THE RECEIPTS <ArrowDown size={16} /></a></div><div id="quality-details" className="gsm-card"><span>FABRIC WEIGHT</span><div className="gsm-list"><div><b>180</b><small>GSM / EVERYDAY</small></div><div><b>220</b><small>GSM / OVERSIZED</small></div><div className="gsm-heavy"><b>240</b><small>GSM / PREMIUM</small></div><div><b>320</b><small>GSM / FLEECE</small></div></div></div><div className="detail-list"><div><b>PRINT</b><span>Water-based, toxin-free, non-hazardous inks. Epson UltraChrome DG inks where applicable.</span></div><div><b>FEEL</b><span>Bio-washing uses enzymes to remove loose surface fibers and improve softness.</span></div><div><b>FIT</b><span>Pre-shrunk construction helps reduce shrinkage during washing.</span></div><div><b>FULFILLMENT</b><span>Printed on demand. Made when you order. Shipped to you.</span></div></div></div></section>

    <section id="women" className="meme-strip-section"><div className="strip-title"><span>05 / DISCOVER</span><h2>THE MEME<br /><em>IS THE PRODUCT</em></h2></div><div className="meme-scroller">{['very demure','it is what it is','main character','no thoughts','delulu is the solulu'].map((text, i) => <div className="meme-tile" key={text} style={{ transform: `rotate(${i % 2 ? 3 : -3}deg)` }}><span>{i % 2 ? '✳' : 'lol'}</span><b>{text}</b><small>wear this if your screen time is a personality trait.</small></div>)}</div></section>

    <section className="reviews-section section-pad"><div className="section-head"><span className="eyebrow">06 / REAL PEOPLE ONLY</span><h2>THEY SAID<br /><em>WHAT?</em></h2></div><div className="empty-review"><span className="review-stars">★★★★★</span><h3>Nobody has reviewed this yet.</h3><p>Be the first victim.</p><button className="button button-black" onClick={() => setSelected(products[0])}>WEAR IT FIRST <ArrowRight size={16} /></button></div></section>

    <section className="faq-section section-pad"><div className="section-head"><span className="eyebrow">07 / IMPORTANT BUT FUN</span><h2>FAQ, BUT<br /><em>MAKE IT LOUD</em></h2></div>{['Is shipping actually included?', 'How does made-to-order work?', 'Can I cancel my order?', 'What if something arrives wrong?'].map((q, i) => <div className="faq-row" key={q}><button onClick={() => setFaq(faq === i ? null : i)}><span>0{i + 1}</span><b>{q}</b>{faq === i ? <Minus /> : <Plus />}</button>{faq === i && <p>{i === 0 ? 'Yes. The price you see is the product price with shipping included. No surprise fees.' : i === 1 ? 'We print and prepare your selected design after you order. It helps us avoid overproduction.' : i === 2 ? 'Cancellations are available within 6 hours of placing your order. After that window, we may have already started preparing your made-to-order item.' : 'Talk to the humans behind the memes through support and include photos where appropriate.'}</p>}</div>)}</section>

    <section className="final-cta"><span className="final-doodle">✳</span><h2>YEAH, YOU<br /><em>NEED THIS.</em></h2><a className="button button-yellow" href="#shop">FIX YOUR WARDROBE <ArrowRight size={17} /></a><span className="final-small">or don't. stay boring.</span></section>

    <footer className="site-footer"><div className="footer-brand"><a className="logo" href="#top">hi lol<span>.</span></a><p>wear your humor.</p><span className="footer-note">made with questionable decisions in india.</span></div><div className="footer-links"><div><b>SHOP</b><a href="#shop">All memes</a><a href="#oversized">Oversized</a><a href="#hoodies">Hoodies</a><a href="#women">Women</a></div><div><b>HELP</b><a href="/track">Track order</a><a href="/support">Support</a><a href="/refund-policy">Refunds</a><a href="/cancellation-policy">Cancellation</a></div><div><b>LEGAL</b><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="#quality-details">Quality</a></div></div><div className="footer-bottom"><span>© 2024 HI LOL</span><span>INSTAGRAM ↗</span></div></footer>

    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X /></button><ProductVisual product={selected} large /><div className="modal-content"><span className="product-category">{selected.category}</span><h2>{selected.name}</h2><p className="wear-this">wear this if...</p><p>{selected.copy}</p><div className="modal-tabs"><span className="active">THE FIT</span><span>THE FABRIC</span><span>THE MEME</span></div><div className="modal-meta"><span>{selected.gsm}</span><span>SHIPPING INCLUDED</span><strong>₹{selected.price}</strong></div><div className="size-row"><span>CHOOSE SIZE</span>{selected.sizes.map((size) => <button key={size} onClick={() => add(selected, size)}>{size}</button>)}</div><button className="button button-black full" onClick={() => add(selected)}>YEAH, ADD TO CART <ArrowRight size={17} /></button></div></div></div>}
    {cartOpen && <div className="cart-drawer-wrap" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><span>YOUR CART ({cart.reduce((n, i) => n + i.qty, 0)})</span><button onClick={() => setCartOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><span className="cart-face">:—)</span><h2>bro...<br />you left the<br /><em>cart empty.</em></h2><button className="button button-black" onClick={() => setCartOpen(false)}>FIX THAT <ArrowRight size={16} /></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={`${item.product.name}-${item.size}`}><div className="cart-thumb" style={{ background: item.product.color }}><span>LOL</span></div><div className="cart-item-copy"><b>{item.product.name}</b><small>{item.size} / SHIPPING INCLUDED</small><div className="qty"><button onClick={() => setCart((items) => items.map((x) => x === item ? { ...x, qty: Math.max(0, x.qty - 1) } : x).filter((x) => x.qty))}><Minus size={13} /></button>{item.qty}<button onClick={() => setCart((items) => items.map((x) => x === item ? { ...x, qty: x.qty + 1 } : x))}><Plus size={13} /></button></div></div><strong>₹{item.product.price * item.qty}</strong></div>)}</div><div className="cart-summary"><div><span>SUBTOTAL</span><b>₹{total}</b></div><p>shipping included. always.</p><button className="button button-yellow full">CHECKOUT <ArrowRight size={17} /></button></div></>}</aside></div>}
  </main>
}
