export interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}
