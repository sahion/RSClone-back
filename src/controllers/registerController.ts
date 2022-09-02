import express, {Request, Response} from 'express';
import { IUser } from '../interfaces/IUser';
import {getRandomInt} from '../modules/getRandomBackground';
import { usersDB } from '../model/usersDB';

const DEFAULT_AVATARS = 11;
const server = process.env.server as string;


const fsPromises  = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req: Request, res: Response) => {
  const data = req.body as IUser;
  if (!data) return res.status(400).json({'message': `request body is ${data}`});
  const {login, pwd, email, name, avatar} = data;
  if (!login || !pwd || !email || !name) return res.status(400).json({'message': 'some fields are empty'});
  const duplicate = usersDB.users.find(person => person.login === login);
  if (duplicate) return res.status(409).json({'message': 'user with this login already exist'});;  
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    let profilePicture = (avatar) ? avatar : `${server}/defaultavatar${getRandomInt(DEFAULT_AVATARS) + 1}.svg`;
    const newUser = {"id":usersDB.users.length + 1 , "login": login, "pwd": hashedPwd, "email": email, "name": name, "avatar": profilePicture, goodThings: 0};
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