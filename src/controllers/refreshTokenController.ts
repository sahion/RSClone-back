import {Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { usersDB } from '../model/usersDB';


require('dotenv').config();

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;
  const foundUser = usersDB.users.find( person => person.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403) //Forbidden;
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err || foundUser.login !== (decoded as JwtPayload).login) return res.sendStatus(403); // invalid token
      const accessToken = jwt.sign(
        {"login": (decoded as JwtPayload).login},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn: "15m"}
      );
      res.json({ accessToken });
    }
  )
}


module.exports = { handleRefreshToken } ;