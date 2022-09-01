import { IUser } from "./IUser";

export interface IApply {
  id?: number,
  userId: number,
  participants: IUser[],
  category: string,
  format: string,
  country: string,
  location?: string, 
  date?: string,
  description: string, 
  open: boolean,
} 