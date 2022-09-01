import {Request, Response} from 'express';
import { IUser, IUserSecure } from '../interfaces/IUser';

const usersDB = {
  users: require('../../data/users.json') as IUser[],
}

const getUsers = (req: Request,res: Response) =>{
  const users: IUserSecure[] = [];
  usersDB.users.forEach(user => {
    users.push({
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    })
  })
  return res.json(users);
}

const getUser = (req: Request,res: Response) =>{
  const user = usersDB.users.find(user => user.id === +req.params.id);
  if (!user) return res.status(404).json({'message': 'такой пользователь не существует'});
  const userSecured: IUserSecure = {
    id: user.id,
    login: user.login,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  }
  return res.json(userSecured);
}


module.exports = {getUsers, getUser};