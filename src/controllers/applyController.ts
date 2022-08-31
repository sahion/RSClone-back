import {Request, Response} from 'express';
import { IApply } from '../interfaces/IApply';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const ApplyDB = {
  applies: require('../../data/applies.json') as IApply[],
  setApplies: function (data: IApply[]) {this.applies = data}
}

const fsPromises  = require('fs').promises;
const path = require('path');

const getApplies = (req: Request,res: Response) =>{
  return res.json(ApplyDB.applies);
}

const createApply = async (req: Request,res: Response) => {
  const data:IApply = req.body;
  const authHeader = req.headers['authorization'] as string;
  if (!data.category || !data.format || !data.country || !data.description) return res.status(400).json({'message' : 'какие-то из обязательных полей не заполнены'});
  const user = jwt.decode(authHeader) as IUser;
  const newApply: IApply = {id: ApplyDB.applies.length + 1,...data, userId: user.id, participants: []};
  ApplyDB.setApplies([...ApplyDB.applies,newApply]);
  await fsPromises.writeFile(
    path.join(__dirname, '..', '..', 'data' , 'applies.json'),
    JSON.stringify(ApplyDB.applies)
  );
  
  return res.status(200).json({'message': 'Заявка успешно создана'});
  }

module.exports = { getApplies, createApply } ;