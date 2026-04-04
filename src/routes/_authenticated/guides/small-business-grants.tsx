import { createFileRoute } from '@tanstack/react-router'
import { GuideLocked } from '@/features/guides/pages/guide-locked'

export const Route = createFileRoute('/_authenticated/guides/small-business-grants')({
  component: GuideLocked,
})
