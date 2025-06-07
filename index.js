//import applications
import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

let app = express();

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