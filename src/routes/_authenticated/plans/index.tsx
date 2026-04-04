import { createFileRoute } from '@tanstack/react-router'
import { BusinessPlanDashboard } from '@/features/plans/business-plan-dashboard'

export const Route = createFileRoute('/_authenticated/plans/')({
  component: BusinessPlanDashboard,
})
