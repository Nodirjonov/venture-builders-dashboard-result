import { createFileRoute } from '@tanstack/react-router'
import { GuideLicenses } from '@/features/guides/pages/guide-licenses'

export const Route = createFileRoute('/_authenticated/guides/licenses-permits')({
  component: GuideLicenses,
})
