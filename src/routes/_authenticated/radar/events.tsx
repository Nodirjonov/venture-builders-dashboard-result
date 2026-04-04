import { createFileRoute } from '@tanstack/react-router'
import { RadarEvents } from '@/features/radar'

export const Route = createFileRoute('/_authenticated/radar/events')({
  component: RadarEvents,
})
