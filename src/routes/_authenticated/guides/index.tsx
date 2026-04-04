import { createFileRoute } from '@tanstack/react-router'
import { GuidesList } from '@/features/guides/pages/guides-list'

export const Route = createFileRoute('/_authenticated/guides/')({
  component: GuidesList,
})
