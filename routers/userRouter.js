import jwt from 'jsonwebtoken';
import validateSession from '../middlewares/validatesession.js';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router } from 'express';
import User from '../models/User.js';

const app = express();
app.use(express.json());
const userRouter = Router();

// //simple test route
// userRouter.get('/test', (req, res) => res.send('Test route works!'));

userRouter.post('/signup', async (req, res) => {
    try{
        //encrypts pw to store in the db 10 = number of salt
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            //uses spread operator to add the rest of the the object for user
            ...req.body, 
            password: passwordHash
        });   
        await newUser.save();
        //creates a sessionToken that is unique to one person _id and JWT Secret
        const sessionToken = jwt.sign(
            {_id: newUser._id},
            process.env.JWT_SECRET,
            //expires in 1 day
                { expiresIn: 60 *60 *24 }
        );
        res.json ({ message: 'Sign up successful', sessionToken});
     
    } catch (err) {
        res.json({error: err});
        console.log(err);
    }
});

//sign in route will issue a new sessionToken when the old one has expired
userRouter.post('/signin', async (req, res) => {
    try {
        
        const user = await User.findOne({
            email: req.body.email,
        });
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json( { error: "incorrect password"});

        }
            const sessionToken = jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            //expires in 1 day
            { expiresIn: 60 *60 *24 }
        );
        res.json({ message: "Login Successful", sessionToken });

    } catch(err) {
        res.json({error: err});
        console.log(err);
    }
})

export default userRouter