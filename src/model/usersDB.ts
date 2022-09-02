import { IUser } from "../interfaces/IUser"

export  const usersDB = {
  users: require('../../data/users.json') as IUser[],
  setUsers: function (data: IUser[]) {this.users = data}
}