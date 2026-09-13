import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="auth-page">
      <a className="auth-logo" href="/" aria-label="Back to HILOL">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" />
      </a>
      <p className="eyebrow">ACCOUNT / SECURE ACCESS</p>
      <h1>sign in.<br /><em>keep it moving.</em></h1>
      <p className="auth-lede">Use Google, phone verification, or another method enabled for your account.</p>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/" appearance={{ variables: { colorPrimary: '#ffe600', colorBackground: '#f7f6f1', colorText: '#090909', borderRadius: '0px' }, elements: { card: 'auth-card', headerTitle: 'auth-card-title', formButtonPrimary: 'auth-primary-button', socialButtonsBlockButton: 'auth-social-button' }, options: { logoImageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg', socialButtonsPlacement: 'top' } }} />
    </main>
  )
}
