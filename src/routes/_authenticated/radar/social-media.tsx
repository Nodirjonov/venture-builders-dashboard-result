import { createFileRoute } from '@tanstack/react-router'
import { RadarSocialMedia } from '@/features/radar'

export const Route = createFileRoute('/_authenticated/radar/social-media')({
  component: RadarSocialMedia,
})
