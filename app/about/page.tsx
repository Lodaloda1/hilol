import Link from 'next/link'
import { InstantBack } from '@/components/instant-back'

export default function AboutPage() {
  return <main className="policy-page about-page">
    <Link className="logo" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" /></Link>
    <InstantBack />
    <span className="eyebrow">ABOUT / HI LOL</span>
    <h1>wear your<br /><em>humor.</em></h1>
    <p className="policy-lede">HILOL makes premium streetwear for people whose camera roll has context they cannot explain.</p>
    <section><h2>Made for the group chat</h2><p>We turn original internet-lore energy into clothes you can actually wear outside. The joke comes first, the garment still has to work.</p></section>
    <section><h2>Clean underneath</h2><p>Every piece is selected for fit, fabric, and print quality, then finished with the kind of humor that escaped Instagram and landed on a sleeve.</p></section>
    <section><h2>No corporate origin story</h2><p>Just good clothes, specific jokes, and a mildly concerning amount of screen time. Wear your humor.</p></section>
    <Link className="button button-black" href="/#shop">SHOP THE DROP <span aria-hidden="true">→</span></Link>
  </main>
}
