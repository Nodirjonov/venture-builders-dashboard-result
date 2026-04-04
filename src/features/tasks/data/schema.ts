import { z } from 'zod'
import type { Task } from '@/types'

// Zod schema for runtime validation (forms, API responses).
// The canonical Task type lives in src/types/task.ts.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

// Re-export the shared domain type for convenience within this feature.
export type { Task }
