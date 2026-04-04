import { createFileRoute } from '@tanstack/react-router'
import { RadarCompetitorMonitoring } from '@/features/radar'

export const Route = createFileRoute('/_authenticated/radar/competitor-monitoring')({
  component: RadarCompetitorMonitoring,
})
