import type { Task, PaginatedResponse, PaginationParams } from '@/types'
import { tasks as mockTasks } from '@/features/tasks/data/tasks'

// TODO: replace mock implementations with real apiClient calls when backend is ready
// import { apiClient } from './client'

export async function getTasks(
  _params?: PaginationParams
): Promise<PaginatedResponse<Task>> {
  // TODO: return apiClient.get('/tasks', { params }).then(r => r.data)
  return {
    data: mockTasks as Task[],
    total: mockTasks.length,
    page: _params?.page ?? 1,
    pageSize: _params?.pageSize ?? 10,
    totalPages: Math.ceil(mockTasks.length / (_params?.pageSize ?? 10)),
  }
}

export async function createTask(
  _payload: Omit<Task, 'id'>
): Promise<Task> {
  // TODO: return apiClient.post('/tasks', payload).then(r => r.data)
  throw new Error('Not implemented')
}

export async function updateTask(
  _id: string,
  _payload: Partial<Omit<Task, 'id'>>
): Promise<Task> {
  // TODO: return apiClient.patch(`/tasks/${id}`, payload).then(r => r.data)
  throw new Error('Not implemented')
}

export async function deleteTask(_id: string): Promise<void> {
  // TODO: return apiClient.delete(`/tasks/${id}`)
  throw new Error('Not implemented')
}
