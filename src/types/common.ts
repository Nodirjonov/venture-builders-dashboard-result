export type ID = string

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface SortParams {
  sortBy: string
  sortDir: 'asc' | 'desc'
}

export interface SelectOption<T extends string = string> {
  label: string
  value: T
  icon?: React.ComponentType<{ className?: string }>
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
