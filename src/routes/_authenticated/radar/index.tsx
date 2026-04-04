import { createFileRoute } from '@tanstack/react-router'
import { RadarOverview } from '@/features/radar'

export const Route = createFileRoute('/_authenticated/radar/')({
  component: RadarOverview,
})
