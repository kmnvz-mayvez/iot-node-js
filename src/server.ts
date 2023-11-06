import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config()

app.use(json());

app.use(cors({
    credentials: false,
    origin: ['http://localhost:5173', 'https://smarthome-indonesia.vercel.app']
}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hi there');
});

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})


