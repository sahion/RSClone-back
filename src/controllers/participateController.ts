import { IParticipate } from "../interfaces/IParticipate";
import {Request, Response} from 'express';
import { ApplyDB } from "../model/applyDB";
import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/IUser";
import path from "path";

const fsPromises  = require('fs').promises;

const handleParticipate = async (req: Request, res: Response) =>{
  const applyId = +req.params.id;
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader.split(' ')[1];
  const user = await jwt.decode(token) as IUser;
  const apply = ApplyDB.applies.find( a => a.id === applyId);
  if (!apply) return res.sendStatus(409);
  if (!apply.open) return res.sendStatus(405);
  const exist = apply.participants.some(p => p === user.id);
  if (exist) return res.sendStatus(200);
  apply?.participants.push(user.id);
  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'applies.json'),
    JSON.stringify(ApplyDB.applies)
  );
  return res.sendStatus(200); 
}


const removeMyParticipation = async (req: Request, res: Response) =>{
  const applyId = +req.params.id;
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader.split(' ')[1];
  const user = await jwt.decode(token) as IUser;
  const apply = ApplyDB.applies.find( a => a.id === applyId);
  if (!apply) return res.sendStatus(200);
  const index = apply.participants.indexOf(user.id);
  if (!(index+1)) return res.sendStatus(200);
  apply?.participants.splice(index, 1);
  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'applies.json'),
    JSON.stringify(ApplyDB.applies)
  );
  return res.sendStatus(200); 
  }

module.exports = { handleParticipate, removeMyParticipation };