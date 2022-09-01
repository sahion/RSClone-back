import express, {Request, Response} from 'express';
import { IUser } from '../interfaces/IUser';
import { getRandomColor } from '../modules.ts/getRandomBackground';


const DEFAULT_AVATARS = 11;

const usersDB = {
  users: require('../../data/users.json') as IUser[],
  setUsers: function (data: IUser[]) {this.users = data}
}

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
    let profilePicture = (avatar) ? avatar : `http://localhost:3000/avatar/defaultavatar${Math.floor(Math.random() * DEFAULT_AVATARS)}.svg`;
    const newUser = {"id":usersDB.users.length + 1 , "login": login, "pwd": hashedPwd, "email": email, "name": name, "avatar": profilePicture};
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