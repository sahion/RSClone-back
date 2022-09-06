import {Request, Response} from 'express';
import { IUser, IUserSecure } from '../interfaces/IUser';
import { usersDB } from '../model/usersDB';
import jwt from 'jsonwebtoken';

const fsPromises  = require('fs').promises;
const path = require('path');


const SERVER = process.env.SERVER as string;

const getUsers = (req: Request,res: Response) =>{
  const users: IUserSecure[] = [];
  usersDB.users.forEach(user => {
    users.push({
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      goodThings: user.goodThings
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
    avatar: user.avatar,
    goodThings: user.goodThings
  }
  return res.json(userSecured);
}

const changeUser = async (req: Request,res: Response) =>{
  let user : IUser = req.body;
  const avatar = req.file;

  const foundUser = usersDB.users.find((u)=> u.id === user.id);

  if (avatar){
    const avatarName = `avatar${foundUser?.id}${path.extname(avatar?.path)}`;
      const avatarPath = path.join(avatar.destination,avatarName);
      fsPromises.rename(avatar.path,avatarPath);
      const profilePicture = `${SERVER}/avatar/${avatarName}`;
      user.avatar = profilePicture;
  }
  

  const otherUsers =usersDB.users.filter((u)=> u.id !== user.id);
  const newUser = {...foundUser, ...user};
  usersDB.setUsers([...otherUsers, newUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'users.json'),
    JSON.stringify(usersDB.users)
  );


  const accessToken = jwt.sign(
    { "id" : newUser.id,
      "login": newUser.login,
      "name": newUser.name,
      "email": newUser.email,
      "avatar": newUser.avatar,
      "goodThings": newUser.goodThings
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m'}
  );
  res.status(201).json({ accessToken });
}


module.exports = {getUsers, getUser, changeUser};