import { createFileRoute } from '@tanstack/react-router'
import { HelpCenterView } from '@/features/help-center/help-center-view'

export const Route = createFileRoute('/_authenticated/help-center/')({
  component: HelpCenterView,
})
