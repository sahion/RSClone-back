export interface IApply {
  id?: number,
  userId: number,
  participants: IUser[],
  category: string,
  format: string,
  contact?: (string | null)[],
  country: string,
  location?: string, 
  time?: string,
  description: string, 
  open: boolean,
} 