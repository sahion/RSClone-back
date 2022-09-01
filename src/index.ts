import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const verifyJWT = require('./middleware/verifyJWT');
const jsonParser = require('body-parser').json();;
const cookieParser = require('cookie-parser');
const applyController = require('./controllers/applyController');
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());


app.use('/register', jsonParser, require('./routes/register'));
app.use('/auth', jsonParser, require('./routes/auth'));
app.use('/refresh', jsonParser, require('./routes/refresh'));

app.use('/logout', jsonParser, require('./routes/logout'));
app.use('/apply', jsonParser, require('./routes/apply'));
app.use('/user', jsonParser, require('./routes/users'));
app.use('/avatar', jsonParser, require('./routes/avatar'));
app.use(verifyJWT);
app.get('/', (req: Request, res: Response) => {
  return res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});