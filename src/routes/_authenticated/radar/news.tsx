import { createFileRoute } from '@tanstack/react-router'
import { RadarNews } from '@/features/radar'

export const Route = createFileRoute('/_authenticated/radar/news')({
  component: RadarNews,
})
