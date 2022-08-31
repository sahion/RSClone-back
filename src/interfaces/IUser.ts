export interface IUser {
  id: number,
  login: string,
  pwd: string,
  name: string,
  email: string,
  backgroundColor: string,
  refreshToken?: string
}

export interface IUserSecure {
  id: number,
  login: string,
  name: string,
  email: string,
}