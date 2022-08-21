import { Request } from "express"
export interface IRequestUser extends Request {
  user: string // or any other type
}