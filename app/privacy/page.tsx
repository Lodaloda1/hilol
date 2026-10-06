import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function PrivacyPage() { const content = legalContent.privacy; return <LegalPage {...content} /> }
