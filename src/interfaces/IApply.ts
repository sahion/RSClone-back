import { IUser } from "./IUser";

export interface IApply {
  id?: number,
  userId: number,
  participants: number[],
  category: string,
  format: string,
  country: string,
  location?: string, 
  date?: string,
  description: string, 
  open: boolean,
} 