import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './router/globalRouter';
import globalError from './error/Global_Error';
const app: Application = express()
import cookieParser from 'cookie-parser';

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to chat application',
  })
})

app.use('/api/v1',router)

app.use(globalError)

export default app

