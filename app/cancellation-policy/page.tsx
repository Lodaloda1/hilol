import { LegalPage } from '@/components/legal-page'
import { legalContent } from '@/lib/legal-content'

export default function CancellationPolicyPage() { const content = legalContent.cancellation; return <LegalPage {...content} /> }
