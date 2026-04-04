export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'canceled'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskLabel = 'bug' | 'feature' | 'documentation'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  label: TaskLabel
  priority: TaskPriority
}
