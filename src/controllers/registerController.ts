import express, {Request, Response} from 'express';
import { IUser } from '../interfaces/IUser';
import {getRandomInt} from '../modules/getRandomBackground';
import { usersDB } from '../model/usersDB';
import { removeFile } from '../modules/removeFile';

const DEFAULT_AVATARS = 11;
const server = process.env.SERVER as string;

const fsPromises  = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req: Request, res: Response) => {
  const data = req.body as IUser;
  const avatar = req.file;
  if (!data) {
    if (avatar) removeFile(avatar.path);
    return res.status(400).json({'message': `request body is ${data}`})
  };
  const {login, pwd, email, name} = data;
  if (!login || !pwd || !email || !name)  {
    console.log(avatar);
    if (avatar) removeFile(avatar.path);
    return res.status(400).json({'message': 'some fields are empty'})
  };
  const duplicate = usersDB.users.find(person => person.login === login);
  if (duplicate) {
    if (avatar) removeFile(avatar.path);
    return res.status(409).json({'message': 'user with this login already exist'});  
  }
  try {
    const userId = usersDB.users.length + 1;
    const hashedPwd = await bcrypt.hash(pwd, 10);
    let profilePicture = `${server}/avatar/defaultavatar${getRandomInt(DEFAULT_AVATARS) + 1}.svg`;
    if (avatar){
      const avatarName = `avatar${userId}${path.extname(avatar?.path)}`;
      const avatarPath = path.join(avatar.destination,avatarName);
      fsPromises.rename(avatar.path,avatarPath);
      profilePicture = `${server}/avatar/${avatarName}`;
    }
    const newUser = {"id":userId , "login": login, "pwd": hashedPwd, "email": email, "name": name, "avatar": profilePicture, goodThings: 0};
    console.log(newUser);
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', '..', 'data' , 'users.json'),
      JSON.stringify(usersDB.users)
    );
    res.status(201).json({'success': `New user ${login} was created`});
  } catch(err){
    if (err instanceof Error)
    return res.status(500).json({'message': err.message});
  }
}

module.exports = {handleNewUser};