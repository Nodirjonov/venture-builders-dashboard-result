import { createFileRoute } from '@tanstack/react-router'
import { Formation } from '@/features/formation'

export const Route = createFileRoute('/_authenticated/formation/')({
  component: Formation,
})
