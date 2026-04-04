import { createFileRoute } from '@tanstack/react-router'
import { Pitch } from '@/features/pitch'

export const Route = createFileRoute('/_authenticated/pitch/')({
  component: Pitch,
})
