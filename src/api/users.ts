import type { User, PaginatedResponse, PaginationParams } from '@/types'
import { users as mockUsers } from '@/features/users/data/users'

// TODO: replace mock implementations with real apiClient calls when backend is ready
// import { apiClient } from './client'

export async function getUsers(
  _params?: PaginationParams
): Promise<PaginatedResponse<User>> {
  // TODO: return apiClient.get('/users', { params }).then(r => r.data)
  return {
    data: mockUsers as unknown as User[],
    total: mockUsers.length,
    page: _params?.page ?? 1,
    pageSize: _params?.pageSize ?? 10,
    totalPages: Math.ceil(mockUsers.length / (_params?.pageSize ?? 10)),
  }
}

export async function inviteUser(
  _payload: Pick<User, 'email' | 'role'>
): Promise<User> {
  // TODO: return apiClient.post('/users/invite', payload).then(r => r.data)
  throw new Error('Not implemented')
}

export async function updateUser(
  _id: string,
  _payload: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<User> {
  // TODO: return apiClient.patch(`/users/${id}`, payload).then(r => r.data)
  throw new Error('Not implemented')
}

export async function deleteUser(_id: string): Promise<void> {
  // TODO: return apiClient.delete(`/users/${id}`)
  throw new Error('Not implemented')
}

export async function deleteUsers(_ids: string[]): Promise<void> {
  // TODO: return apiClient.post('/users/bulk-delete', { ids }).then(r => r.data)
  throw new Error('Not implemented')
}
