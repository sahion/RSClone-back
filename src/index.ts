import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const verifyJWT = require('./middleware/verifyJWT');
const jsonParser = require('body-parser').json();;
const cookieParser = require('cookie-parser');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('RS-Clone Server');
});

app.use('/register', jsonParser, require('./routes/register'));
app.use('/auth', jsonParser, require('./routes/auth'));
app.use('/refresh', jsonParser, require('./routes/refresh'));
app.use(verifyJWT);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});