import {Request, Response} from 'express';
import path from 'path';

const getAvatar = (req: Request,res: Response) =>{
  const avatarLink =  path.join(__dirname,'..', '..', 'assets', 'img', 'avatar', req.params.id);
  return res.sendFile(avatarLink);
}

module.exports = {getAvatar};