import { ApplyDB } from "../model/applyDB";
import { thanksDB } from "../model/thanksDB";
import { usersDB } from "../model/usersDB";
import {Request, Response} from 'express';


const getAllData = (req: Request,res: Response) =>{
  const authHeader = req.headers['secret'] as string;
  if (authHeader !== "SECRET_KEY") res.sendStatus(403);
  return res.json({
    users: usersDB.users,
    thanksDB: thanksDB.data,
    applies: ApplyDB.applies
  });
}
module.exports = { getAllData}