import express, {Request, Response} from 'express';

const usersDB = {
  users: require('../../data/users.json') as IUser[],
  setUsers: function (data: IUser[]) {this.users = data}
}

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

  res.json({'success': `User ${login} is logged in`});
  //create JWT
}


module.exports = { handleLogin } ;