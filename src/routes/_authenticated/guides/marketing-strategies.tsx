import { createFileRoute } from '@tanstack/react-router'
import { GuideMarketing } from '@/features/guides/pages/guide-marketing'

export const Route = createFileRoute('/_authenticated/guides/marketing-strategies')({
  component: GuideMarketing,
})
