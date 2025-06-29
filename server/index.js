//import applications
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import roomRouter from './routers/roomsRouter.js';
import messageRouter from './routers/messageRouters.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
    }));
app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(messageRouter);

//connect to database
//supresses the error. may have to change it to false. I dont really understand the error.
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DBURL);
const db = mongoose.connection;
db.once('open', () => {
    console.log (`database connected`);
});

//open listen port on 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port: ${process.env.PORT}` )
})