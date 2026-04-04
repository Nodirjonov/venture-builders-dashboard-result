import { z } from 'zod'
import type { Task } from '@/types'

// Zod schema for runtime validation (forms, API responses).
// The canonical Task type lives in src/types/task.ts.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['backlog', 'todo', 'in progress', 'done', 'canceled']),
  label: z.enum(['bug', 'feature', 'documentation']),
  priority: z.enum(['low', 'medium', 'high']),
})

// Re-export the shared domain type for convenience within this feature.
export type { Task }
