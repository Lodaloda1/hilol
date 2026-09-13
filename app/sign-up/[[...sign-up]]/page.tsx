import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <a className="auth-logo" href="/" aria-label="Back to HILOL">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg" alt="HILOL — wear your humor" />
      </a>
      <p className="eyebrow">ACCOUNT / CREATE ACCESS</p>
      <h1>join in.<br /><em>wear it out.</em></h1>
      <p className="auth-lede">Create an account with the verification methods enabled in Clerk.</p>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" fallbackRedirectUrl="/" appearance={{ variables: { colorPrimary: '#ffe600', colorBackground: '#f7f6f1', colorText: '#090909', borderRadius: '0px' }, elements: { card: 'auth-card', headerTitle: 'auth-card-title', formButtonPrimary: 'auth-primary-button', socialButtonsBlockButton: 'auth-social-button' }, options: { logoImageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-9F22B585-1kqlezpaxC4jw8agJdCKAv0KH87Ucf.jpeg', socialButtonsPlacement: 'top' } }} />
    </main>
  )
}
