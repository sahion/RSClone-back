import { verify } from 'crypto';
import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IRequestUser } from '../interfaces/IRequestUser';
import {ApiError} from '../exceptions/api-error';
require('dotenv').config();

const verifyJWT = (req: IRequestUser, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return ApiError.UnauthorizedError();

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      console.log(err);
      if (err) return res.sendStatus(401);
      req.user = (decoded as JwtPayload).username ;
      next();
    }
  );
}

module.exports = verifyJWT;