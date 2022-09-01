import { IUser } from "./IUser";

export interface IApply {
  id?: number,
  userId: number,
  participants: IUser[],
  category: string,
  format: string,
  country: string,
  location?: string, 
  time?: string,
  description: string, 
  open: boolean,
} 