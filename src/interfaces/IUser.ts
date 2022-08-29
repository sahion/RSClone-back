interface IUser {
  id: number,
  login: string,
  pwd: string,
  name: string,
  email: string,
  refreshToken?: string
}