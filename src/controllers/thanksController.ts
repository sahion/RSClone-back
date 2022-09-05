import {Request, Response} from 'express';
import { usersDB } from '../model/usersDB';
import { thanksDB } from '../model/thanksDB';
import { IThanks } from '../interfaces/IThanks';
import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import { closeApply } from './applyController';

const fsPromises  = require('fs').promises;
const path = require('path');

const getThank = (req: Request,res: Response) =>{
  const thanks = thanksDB.data.find(thank => thank.id === +req.params.id);
  if (!thanks) return res.status(404).json({'message': 'такой заявки не существует'});
  return res.json(thanks);
}


 const getThanks = (req: Request,res: Response) =>{
  return res.json(thanksDB.data);
}




const createThanks = async (req: Request, res: Response) => {
  const {applyId, participants, description} = req.body as IThanks;

  const authHeader = req.headers['authorization'] as string;

  if( !applyId || !participants || participants.length === 0) return res.sendStatus(400);
  if( !authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if( !token) return res.sendStatus(401);
  const user = await jwt.decode(token) as IUser;
  (console.log(typeof closeApply))
  await closeApply(+applyId); 
  usersDB.users.forEach(user => {
    if (participants.some(p => p === user.id)) user.goodThings += 1;
  });
  
  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'users.json'),
    JSON.stringify(usersDB.users)
  );

  thanksDB.data.push(
    {
      id: thanksDB.data.length + 1,
      userId: user.id,
      applyId: applyId,
      participants: participants,
      description: description
    }
  );
  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'thanks.json'),
    JSON.stringify(thanksDB.data)
  );
  res.sendStatus(201);
}


module.exports = {getThank, getThanks, createThanks}