import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const usersDB = {
  users: require('../../data/users.json') as IUser[],
  setUsers: function (data: IUser[]) {this.users = data}
}

require('dotenv').config();
const fsPromises  = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req: Request, res: Response) => {
  const data = req.body as IUser;
  if (!data) return res.status(400).json({'message': `request body is ${data}`});
  const {login, pwd} = data;
  if (!login || !pwd) return res.status(400).json({'message': 'some fields are empty'});
  const foundUser = usersDB.users.find( person => person.login === login);
  if (!foundUser) return res.sendStatus(401);
  // evaluate password
  const match =  await bcrypt.compare(pwd, foundUser.pwd);
  if (!match) return res.sendStatus(401);

  //create JWT
  const accessToken = jwt.sign(
    { "login": foundUser.login},
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m'}
  );
  const refreshToken = jwt.sign(
    { "login": foundUser.login},
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '1d'}
  );
  const otherUsers = usersDB.users.filter( person => person.name !== foundUser.login );
  const currentUserWithToken = {...foundUser, refreshToken};
  usersDB.setUsers([...otherUsers,currentUserWithToken]); 
  await fsPromises.writeFile(
    path.join(__dirname,'..','..','data','users.json'),
    JSON.stringify(usersDB.users)
    );
  res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
  res.json({ accessToken });
}


module.exports = { handleLogin } ;