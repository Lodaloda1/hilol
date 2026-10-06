import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function CancellationPage() { const content = legalContent.cancellation; return <LegalPage {...content} /> }
