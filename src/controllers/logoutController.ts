import {Request, Response} from 'express';
import { usersDB } from '../model/usersDB';

const fsPromises = require('fs').promises;
const path = require('path');


require('dotenv').config();

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken: string = cookies.jwt;
  const foundUser = usersDB.users.find( person => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true});
    return res.sendStatus(204)
  }
  // evaluate jwt
  const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken: ''};
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname,'data', 'users.json'),
    JSON.stringify(usersDB.users)
  )
  res.clearCookie('jwt', {httpOnly: true});
  return res.sendStatus(204);
}


module.exports = { handleLogout } ;