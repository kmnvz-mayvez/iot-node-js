import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config()

app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hi there');
});

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})


