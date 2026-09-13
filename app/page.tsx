'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Minus, Plus, ShoppingBag, X } from 'lucide-react'

type MemeTier = 'COMMON BALL KNOWLEDGE' | 'MID BALL KNOWLEDGE' | 'ELITE BALL KNOWLEDGE'
type StockStatus = 'available' | 'out-of-stock' | 'not-configured'
type PricingRule = 'general' | 'flat' | 'long-sleeve' | 'hoodie' | 'womens-round' | 'womens-crop'

type Meme = {
  id: string
  name: string
  tier: MemeTier
  artwork: string
  licensing: 'ORIGINAL' | 'LICENSED' | 'PERMISSION_GRANTED' | 'REVIEW_REQUIRED'
}

type Variant = {
  id: string
  color: string
  hex: string
  sizes: string[]
  stock: Record<string, StockStatus>
  printroveProductId?: string
  printroveVariantIds?: Record<string, string>
}

type Garment = {
  id: string
  name: string
  short: string
  basePrice: number
  gsm: string
  description: string
  fit: string
  care: string
  pricingRule: PricingRule
  supportsMemes: boolean
  variants: Variant[]
  compatibleMemeIds: string[]
}

type CartItem = { garmentId: string; variantId: string; memeId?: string; size: string; quantity: number }

const memes: Meme[] = [
  { id: 'm01', name: 'one more reel', tier: 'COMMON BALL KNOWLEDGE', artwork: 'ONE MORE REEL', licensing: 'ORIGINAL' },
  { id: 'm02', name: 'camera roll evidence', tier: 'MID BALL KNOWLEDGE', artwork: 'DELETE NOTHING', licensing: 'ORIGINAL' },
  { id: 'm03', name: 'algorithmic damage', tier: 'MID BALL KNOWLEDGE', artwork: 'THE FEED NEVER ENDS', licensing: 'ORIGINAL' },
  { id: 'm04', name: 'offline pending', tier: 'ELITE BALL KNOWLEDGE', artwork: 'TOUCH GRASS LATER', licensing: 'ORIGINAL' },
  { id: 'm05', name: 'bad decision club', tier: 'ELITE BALL KNOWLEDGE', artwork: 'GOOD OUTFIT THOUGH', licensing: 'ORIGINAL' },
]

const commonVariant = (id: string, colors: [string, string][], sizes: string[]): Variant[] => colors.map(([color, hex], index) => ({
  id: `${id}-color-${index + 1}`,
  color,
  hex,
  sizes,
  stock: Object.fromEntries(sizes.map((size) => [size, 'not-configured'])) as Record<string, StockStatus>,
}))

const productSeed: Array<Omit<Garment, 'variants' | 'compatibleMemeIds'> & { colors: [string, string][]; sizes: string[] }> = [
  { id: 'mens-round-neck', name: 'The Everyday Meme Tee', short: "Men's Round Neck", basePrice: 449, gsm: '180 GSM / 100% combed cotton', description: 'A 180 GSM, bio-washed, pre-shrunk single-jersey tee printed with water-based Epson Ultrachrome DG inks. Printrove says the fabric lasts up to 20 washes.', fit: 'Everyday fit', care: 'Wash inside out, cold. Do not iron directly on the print.', pricingRule: 'general', supportsMemes: true, colors: [['Black', '#111111'], ['White', '#f4f4f0']], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'mens-v-neck', name: 'The Slightly Extra V', short: "Men's V-Neck", basePrice: 479, gsm: '180 GSM', description: 'A meme, but slightly more V-neck than necessary. Easy everyday fit with the same HILOL brainrot.', fit: 'Regular fit', care: 'Wash inside out, cold. Air dry when possible.', pricingRule: 'flat', supportsMemes: true, colors: [['Black', '#111111'], ['White', '#f4f4f0']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'mens-long-sleeve', name: 'Internet Access Long Sleeve', short: "Men's Long Sleeve", basePrice: 489, gsm: '180 GSM / 100% combed cotton', description: 'A 180 GSM, pre-shrunk, bio-washed cotton long-sleeve tee with water-based Epson Ultrachrome DG printing. Printrove says the fabric lasts up to 20 washes.', fit: 'Regular fit', care: 'Wash inside out, cold. Avoid direct heat on print.', pricingRule: 'long-sleeve', supportsMemes: true, colors: [['Black', '#111111'], ['White', '#f4f4f0']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'normal-oversized-tee', name: 'More Fabric, More Meme', short: 'Normal Oversized Tee', basePrice: 549, gsm: '220 GSM', description: 'More fabric. More space for the meme. More streetwear energy.', fit: 'Boxy oversized silhouette', care: 'Wash inside out, cold. Lay flat to dry.', pricingRule: 'flat', supportsMemes: true, colors: [['Black', '#111111'], ['Bone', '#ded8c9']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'premium-oversized-tee', name: 'The Heavyweight Member', short: 'Premium Oversized Tee', basePrice: 599, gsm: '240 GSM', description: '240 GSM French Terry Loop Knit Unbrushed fabric meets HILOL brainrot. The heavyweight member of the family.', fit: 'Boxy oversized silhouette', care: 'Wash inside out, cold. Do not tumble dry hot.', pricingRule: 'flat', supportsMemes: true, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'sweatshirt', name: 'Winter Mode Activated', short: 'Sweatshirt', basePrice: 659, gsm: '320 GSM', description: 'Your meme just entered winter mode.', fit: 'Relaxed fit', care: 'Wash inside out, cold. Air dry for best results.', pricingRule: 'general', supportsMemes: true, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'regular-hoodie', name: 'Meme For Every Situation', short: 'Regular Hoodie', basePrice: 759, gsm: '320 GSM / 100% cotton', description: 'A 320 GSM cotton hoodie for people who somehow have a meme for every situation.', fit: 'Regular fit with matching drawstrings where applicable', care: 'Wash inside out, cold. Do not iron directly on the print.', pricingRule: 'hoodie', supportsMemes: true, colors: [['Black', '#111111'], ['Navy', '#1d2634']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'oversized-hoodie', name: 'Maximum Hoodie', short: 'Oversized Hoodie', basePrice: 869, gsm: '320 GSM', description: 'Maximum hoodie. Maximum meme.', fit: 'Oversized fit', care: 'Wash inside out, cold. Lay flat to dry.', pricingRule: 'flat', supportsMemes: true, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'joggers', name: 'No Meme. Just Vibes.', short: 'Joggers', basePrice: 599, gsm: '240 GSM / 100% cotton loopback fleece', description: 'No meme. Just vibes. Made from 240 GSM 100% cotton loopback fleece.', fit: 'Relaxed tapered silhouette with ribbed cuffs', care: 'Wash cold with similar colors.', pricingRule: 'flat', supportsMemes: false, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'shorts', name: 'We Tried.', short: 'Shorts', basePrice: 529, gsm: '240 GSM', description: 'No meme here. We tried.', fit: 'Relaxed everyday fit', care: 'Wash cold with similar colors.', pricingRule: 'flat', supportsMemes: false, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'womens-round-neck', name: 'Your Favorite Meme', short: "Women's Round Neck", basePrice: 449, gsm: '180 GSM', description: 'Your favorite meme. Your fit.', fit: 'Everyday fit', care: 'Wash inside out, cold. Air dry when possible.', pricingRule: 'womens-round', supportsMemes: true, colors: [['Black', '#111111'], ['White', '#f4f4f0']], sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'] },
  { id: 'womens-crop-top', name: 'Smaller Canvas', short: "Women's Crop Top", basePrice: 379, gsm: '180 GSM', description: 'Smaller canvas. Same brainrot.', fit: 'Crop silhouette', care: 'Wash inside out, cold. Do not iron directly on the print.', pricingRule: 'womens-crop', supportsMemes: true, colors: [['Black', '#111111'], ['White', '#f4f4f0']], sizes: ['S', 'M', 'L', 'XL', '2XL'] },
  { id: 'womens-crop-hoodie', name: 'Full Internet Damage', short: "Women's Crop Hoodie", basePrice: 699, gsm: '320 GSM', description: 'Crop hoodie. Full internet damage.', fit: 'Cropped hoodie fit', care: 'Wash inside out, cold. Air dry when possible.', pricingRule: 'flat', supportsMemes: true, colors: [['Black', '#111111'], ['Grey', '#777777']], sizes: ['S', 'M', 'L'] },
]

const garments: Garment[] = productSeed.map(({ colors, sizes, ...garment }) => ({ ...garment, variants: commonVariant(garment.id, colors, sizes), compatibleMemeIds: garment.supportsMemes ? memes.map((meme) => meme.id) : [] }))

function priceFor(garment: Garment, size: string) {
  if (garment.pricingRule === 'flat' || garment.pricingRule === 'womens-crop') return garment.basePrice
  if (garment.pricingRule === 'long-sleeve' || garment.pricingRule === 'hoodie') return garment.basePrice + (size === '2XL' ? 20 : 0)
  if (garment.pricingRule === 'womens-round') return garment.basePrice + ({ '2XL': 10, '3XL': 25, '4XL': 45, '5XL': 65 }[size] ?? 0)
  return garment.basePrice + ({ '2XL': 15, '3XL': 35, '4XL': 55, '5XL': 65 }[size] ?? 0)
}

function findGarment(id: string) { return garments.find((garment) => garment.id === id) ?? garments[0] }
function findMeme(id?: string) { return memes.find((meme) => meme.id === id) }

function ProductVisual({ garment, variant, meme, large = false }: { garment: Garment; variant: Variant; meme?: Meme; large?: boolean }) {
  return <div className={`product-visual ${large ? 'product-visual-large' : ''}`} style={{ background: variant.hex }}>
    <div className="visual-noise" />
    <span className="visual-brand">hi lol</span>
    <span className="visual-meme">{meme?.artwork ?? (garment.supportsMemes ? 'SELECT A MEME' : 'PLAIN / NO MEME')}</span>
    <div className="tee-shape"><div className="tee-neck" /><div className="tee-print">{meme ? meme.artwork.split(' ')[0] : 'LOL'}<br /><small>{meme ? 'IRL' : 'WEAR'}</small></div></div>
    <span className="visual-label">{garment.gsm} / {variant.color}</span>
  </div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState('')
  const [selectedMemeId, setSelectedMemeId] = useState<string | undefined>(memes[0].id)
  const [selectedSize, setSelectedSize] = useState('S')
  const [cart, setCart] = useState<CartItem[]>([])
  const [level, setLevel] = useState<MemeTier>('MID BALL KNOWLEDGE')
  const [faq, setFaq] = useState<number | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [cartNotice, setCartNotice] = useState('')
  const [cartReady, setCartReady] = useState(false)

  const selected = selectedId ? findGarment(selectedId) : null

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem('hilol-cart')
      if (savedCart) setCart(JSON.parse(savedCart) as CartItem[])
    } catch {
      setCart([])
    } finally {
      setCartReady(true)
    }
  }, [])

  useEffect(() => {
    if (cartReady) window.localStorage.setItem('hilol-cart', JSON.stringify(cart))
  }, [cart, cartReady])

  useEffect(() => {
    if (!cartNotice) return
    const timeout = window.setTimeout(() => setCartNotice(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [cartNotice])
  const selectedVariant = selected?.variants.find((variant) => variant.id === selectedVariantId) ?? selected?.variants[0]
  const selectedMeme = findMeme(selectedMemeId)
  const cartTotal = useMemo(() => cart.reduce((total, item) => { const garment = findGarment(item.garmentId); return total + priceFor(garment, item.size) * item.quantity }, 0), [cart])

  function openProduct(garment: Garment) {
    setSelectedId(garment.id)
    setSelectedVariantId(garment.variants[0].id)
    setSelectedSize(garment.variants[0].sizes[0])
    setSelectedMemeId(garment.supportsMemes ? garment.compatibleMemeIds[0] : undefined)
  }

  function addToCart() {
    if (!selected || !selectedVariant) return
    const key = `${selected.id}:${selectedVariant.id}:${selectedSize}:${selectedMemeId ?? 'plain'}`
    setCart((items) => {
      const existing = items.find((item) => `${item.garmentId}:${item.variantId}:${item.size}:${item.memeId ?? 'plain'}` === key)
      return existing ? items.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { garmentId: selected.id, variantId: selectedVariant.id, size: selectedSize, memeId: selectedMemeId, quantity: 1 }]
    })
    setSelectedId(null)
    setCartNotice(`(${cart.reduce((total, item) => total + item.quantity, 0) + 1}) item added in cart`)
    setCartOpen(false)
  }

  function changeQuantity(index: number, delta: number) { setCart((items) => items.flatMap((item, itemIndex) => itemIndex === index ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item])) }

  return <main className="site-shell">
    <header className="site-nav"><button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button><a className="logo" href="#top"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="hi lol wear your humor" /></a><nav className="desktop-nav">{['SHOP', 'MEMES', 'OVERSIZED', 'HOODIES', 'WOMEN', 'ABOUT'].map((item) => <a key={item} href={item === 'SHOP' || item === 'HOODIES' || item === 'WOMEN' ? '#shop' : `#${item.toLowerCase()}`}>{item}</a>)}</nav><div className="nav-actions"><a href="/sign-in" className="track-link">SIGN IN</a><a href="/track" className="track-link">TRACK ORDER</a><button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19} /><span>{cart.reduce((total, item) => total + item.quantity, 0)}</span></button></div></header>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}><button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button><span className="menu-kicker">THE MENU, BUT MAKE IT LOUD</span>{['SHOP', 'MEMES', 'OVERSIZED', 'HOODIES', 'WOMEN', 'ABOUT'].map((item, index) => <a key={item} href={item === 'SHOP' || item === 'HOODIES' || item === 'WOMEN' ? '#shop' : `#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}><b>0{index + 1}</b>{item}<ArrowRight /></a>)}<a className="menu-track" href="/track">TRACK ORDER <ArrowRight /></a></div>

    <section id="top" className="hero-section"><div className="hero-copy"><span className="sticker sticker-top">INDIAN MEME WEAR</span><h1>hi<br /><span>lol</span></h1><p className="hero-tagline">wear your humor</p><p className="hero-sub">you were going to scroll anyway. make it a fit.</p><div className="hero-actions"><a className="button button-black" href="#shop">SHOP MEMES <ArrowRight size={17} /></a><a className="scroll-link" href="#brainrot">SCROLL THE BRAINROT <ArrowDown size={16} /></a></div></div><div className="hero-art"><img className="hero-logo-art" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="hi lol. wear your humor" /><div className="hero-shirt"><div className="tee-neck" /><div className="tee-print">BRB<br /><small>BEING<br />ICONIC</small></div></div><span className="sticker sticker-corner">100%<br />UNSERIOUS</span></div><div className="hero-bottom"><span>SCROLL IF YOU DARE</span><span>↓</span><span>EST. 2026 / INDIA</span></div></section>
    <div className="static-strip">WEAR YOUR HUMOR <span>+</span> WEAR YOUR HUMOR <span>+</span> WEAR YOUR HUMOR</div>

    <section id="brainrot" className="brainrot-section section-pad"><div className="section-head"><span className="eyebrow">01 / ENTER THE UNIVERSE</span><h2>SHOP THE<br /><em>BRAINROT</em></h2><p>not a catalog. a personality test with sleeves.</p></div><div className="level-switcher">{(['COMMON BALL KNOWLEDGE', 'MID BALL KNOWLEDGE', 'ELITE BALL KNOWLEDGE'] as MemeTier[]).map((item, index) => <button className={level === item ? 'active' : ''} key={item} onClick={() => setLevel(item)}><span>0{index + 1}</span>{item}<small>{index === 0 ? 'you have definitely seen this.' : index === 1 ? 'the group chat has lore.' : 'touch grass is a rumour.'}</small></button>)}</div></section>

    <section id="shop" className="featured-section section-pad"><div className="section-head row-head"><div><span className="eyebrow">02 / THE DROP</span><h2>FRESH <em>FROM<br />THE GROUP CHAT</em></h2></div><span className="text-link">13 GARMENTS <ArrowRight size={16} /></span></div><div className="product-grid">{garments.map((garment, index) => <article className="product-card" key={garment.id} onClick={() => openProduct(garment)}><div className="product-number">{String(index + 1).padStart(2, '0')}</div><ProductVisual garment={garment} variant={garment.variants[0]} meme={garment.supportsMemes ? memes[0] : undefined} /><div className="product-info"><div><span className="product-category">{garment.short}</span><h3>{garment.name}</h3></div><strong>₹{garment.basePrice}</strong></div><div className="product-hover">OPEN GARMENT <ArrowRight size={17} /></div></article>)}</div></section>

    <section id="oversized" className="fit-section"><div className="fit-copy"><span className="eyebrow">03 / MEME CHECK</span><h2>HOW<br /><em>CHRONICALLY<br />ONLINE?</em></h2><p>Pick your current level of Indian internet damage. No judgment. The slider is already judging.</p><a className="button button-yellow" href="#shop">FIND YOUR MEME <ArrowRight size={16} /></a></div><div className="fit-art"><input className="online-slider" type="range" min="1" max="3" value={level === 'COMMON BALL KNOWLEDGE' ? 1 : level === 'MID BALL KNOWLEDGE' ? 2 : 3} onChange={(event) => setLevel((['COMMON BALL KNOWLEDGE','MID BALL KNOWLEDGE','ELITE BALL KNOWLEDGE'] as MemeTier[])[Number(event.target.value) - 1])} aria-label="How chronically online are you" /><div className="fit-scale"><span>CASUALLY ONLINE</span><span>GROUP CHAT LORE</span><span>THE FEED OWNS YOU</span></div><p className="fit-note">{level === 'COMMON BALL KNOWLEDGE' ? 'you still go outside sometimes.' : level === 'MID BALL KNOWLEDGE' ? 'the group chat has evidence.' : 'your screen time report is not invited.'}</p></div></section>

    <section id="hoodies" className="quality-section section-pad"><div className="quality-title"><span className="eyebrow">04 / RECEIPTS</span><h2>WHY THE<br /><em>FUCK IS IT<br />THIS PRICE?</em></h2></div><div className="quality-grid"><div className="quality-intro"><p>Premium Indian meme wear without the premium markup. Your displayed price is final: GST, shipping and payment fees are already included.</p><a href="#quality-details" className="button button-yellow">THE RECEIPTS <ArrowDown size={16} /></a></div><div id="quality-details" className="gsm-card"><span>FABRIC WEIGHT</span><div className="gsm-list"><div><b>180</b><small>GSM / EVERYDAY</small></div><div><b>220</b><small>GSM / OVERSIZED</small></div><div className="gsm-heavy"><b>240</b><small>GSM / PREMIUM</small></div><div><b>320</b><small>GSM / FLEECE</small></div></div></div><div className="detail-list"><div><b>PRINT</b><span>Water-based, toxin-free Epson Ultrachrome DG inks. The print is built to survive 20+ washes without cracking.</span></div><div><b>FABRIC</b><span>100% combed cotton; heather colours use 20% polyester. Every product is bio-washed and pre-shrunk.</span></div><div><b>CARE</b><span>Pre-shrunk construction helps reduce shrinkage. Follow the garment care instructions.</span></div><div><b>DELIVERY</b><span>Same-day delivery on available routes. Other locations usually take 2–5 business days.</span></div></div></div></section>

    <section className="faq-section section-pad"><div className="section-head"><span className="eyebrow">06 / IMPORTANT BUT FUN</span><h2>FAQ, BUT<br /><em>MAKE IT LOUD</em></h2></div>{['Is shipping actually included?', 'When will my order arrive?', 'Can I cancel my order?', 'What if something arrives wrong?'].map((question, index) => <div className="faq-row" key={question}><button onClick={() => setFaq(faq === index ? null : index)}><span>0{index + 1}</span><b>{question}</b>{faq === index ? <Minus /> : <Plus />}</button><div className={`faq-answer ${faq === index ? 'is-open' : ''}`}><p>{index === 0 ? 'Yes. The displayed retail price includes shipping. No surprise shipping line appears later.' : index === 1 ? 'Available routes offer same-day delivery; other destinations usually take 2–5 business days.' : index === 2 ? 'Cancellations can be requested within 6 hours. After that, production may have started.' : 'Contact support with your order details and clear photos where appropriate.'}</p></div></div>)}</section>

    <section className="final-cta"><h2>YEAH, YOU<br /><em>NEED THIS.</em></h2><a className="button button-yellow" href="#shop">FIX YOUR WARDROBE <ArrowRight size={17} /></a><span className="final-small">or do not. stay boring.</span></section>
    <footer className="site-footer"><div className="footer-brand"><a className="logo" href="#top"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="hi lol wear your humor" /></a><p>wear your humor</p><span className="footer-note">premium meme wear from india.</span></div><div className="footer-links"><div><b>SHOP</b><a href="#shop">All garments</a><a href="#oversized">Oversized</a><a href="#hoodies">Hoodies</a><a href="#shop">Memes are inside each garment</a></div><div><b>HELP</b><a href="/track">Track order</a><a href="/support">Support</a><a href="/refund">Refunds</a><a href="/cancellation">Cancellation</a></div><div><b>LEGAL</b><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/shipping">Shipping</a></div></div><div className="footer-bottom"><span>© 2026 hi lol</span><a href="https://instagram.com/hilolwear" target="_blank" rel="noreferrer">INSTAGRAM</a></div></footer>

    {cartNotice && <div className="cart-notice" role="status"><span>{cartNotice}</span><button onClick={() => setCartOpen(true)}>VIEW</button></div>}

    {selected && selectedVariant && <div className="modal-backdrop" onClick={() => setSelectedId(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedId(null)} aria-label="Close product"><X /></button><ProductVisual garment={selected} variant={selectedVariant} meme={selectedMeme} large /><div className="modal-content"><span className="product-category">{selected.short}</span><h2>{selected.name}</h2><p className="wear-this">wear this if...</p><p>{selected.description}</p>{selected.supportsMemes && <div className="meme-picker"><div className="meme-picker-head"><span>CHOOSE YOUR MEME</span><b>{selectedMeme?.tier}</b></div><div className="meme-picker-grid">{selected.compatibleMemeIds.map((id) => { const meme = findMeme(id)!; return <button key={id} className={selectedMemeId === id ? 'selected' : ''} onClick={() => setSelectedMemeId(id)}><span>{meme.id.toUpperCase()}</span><strong>{meme.artwork}</strong></button> })}</div></div>}<div className="option-block"><span>COLOR</span><div className="color-row">{selected.variants.map((variant) => <button key={variant.id} className={selectedVariant.id === variant.id ? 'selected' : ''} onClick={() => setSelectedVariantId(variant.id)}><i style={{ background: variant.hex }} />{variant.color}<small>{variant.stock[selectedSize] === 'out-of-stock' ? 'OUT OF STOCK' : 'AVAILABLE'}</small></button>)}</div></div><div className="option-block"><span>CHOOSE SIZE</span><div className="size-row">{selectedVariant.sizes.map((size) => <button key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div><div className="product-facts"><span>{selected.gsm}</span><span>{selected.fit}</span><span>PRE-SHRUNK / BIO-WASHED</span><span>SHIPPING INCLUDED</span><span>UPI / CARD / NETBANKING</span></div><div className="product-care"><b>CARE</b><span>{selected.care}</span></div><div className="live-price"><span>GST + DELIVERY + PAYMENT INCLUDED</span><strong>₹{priceFor(selected, selectedSize)}</strong></div><button className="button button-black full" onClick={addToCart}>ADD TO CART <ArrowRight size={17} /></button></div></div></div>}
    {cartOpen && <div className="cart-drawer-wrap" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><span>YOUR CART ({cart.reduce((total, item) => total + item.quantity, 0)})</span><button onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>{cart.length === 0 ? <div className="empty-cart"><span className="cart-face">YOUR CART</span><h2>your cart is<br /><em>waiting for a fit.</em></h2><button className="button button-black" onClick={() => setCartOpen(false)}>BACK TO SHOP <ArrowRight size={16} /></button></div> : <><div className="cart-items">{cart.map((item, index) => { const garment = findGarment(item.garmentId); const variant = garment.variants.find((entry) => entry.id === item.variantId) ?? garment.variants[0]; const meme = findMeme(item.memeId); return <div className="cart-item" key={`${item.garmentId}-${item.variantId}-${item.size}-${item.memeId}`}><div className="cart-thumb" style={{ background: variant.hex }}><span>{meme?.artwork.split(' ')[0] ?? 'PLAIN'}</span></div><div className="cart-item-copy"><b>{garment.name}</b><small>{variant.color} / {item.size} / {meme?.name ?? 'plain'}</small><div className="qty"><button onClick={() => changeQuantity(index, -1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(index, 1)} aria-label="Increase quantity">+</button></div></div><strong>₹{priceFor(garment, item.size) * item.quantity}</strong></div>})}</div><div className="cart-summary"><div><span>SHIPPING</span><b>INCLUDED</b></div><div><span>PAYMENT</span><b>PREPAID ONLY</b></div><div className="cart-total"><span>TOTAL</span><b>₹{cartTotal}</b></div><button className="button button-yellow full" onClick={() => { setOrderPlaced(false); setCheckoutOpen(true) }}>CHECKOUT PREPAID <ArrowRight size={16} /></button></div></>}</aside></div>}
    {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-panel" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X /></button>{orderPlaced ? <div className="order-success"><Check size={42} /><h2>order request received.</h2><p>Your prepaid order request has been recorded. Payment gateway connection can be enabled when you are ready.</p><a className="button button-black" href="/track">VIEW TRACKING</a></div> : <form onSubmit={(event) => { event.preventDefault(); setOrderPlaced(true) }}><span className="eyebrow">PREPAID CHECKOUT</span><h2>your details.<br /><em>no weirdness.</em></h2><p>Pay securely by UPI, card or netbanking. The displayed total already includes GST, delivery and payment fees.</p><div className="checkout-fields"><label>Name<input required name="name" /></label><label>Phone<input required name="phone" inputMode="tel" /></label><label>Email<input required name="email" type="email" /></label><label>Address<input required name="address" /></label><label>City<input required name="city" /></label><label>State<input required name="state" /></label><label>Pincode<input required name="pincode" inputMode="numeric" /></label></div><button className="button button-black full" type="submit">PAY NOW / ₹{cartTotal} <ArrowRight size={16} /></button></form>}</div></div>}
  </main>
}
