import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { Router } from 'express';
import User from '../models/User.js';

const app = express();
app.use(express.json());
const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({ error: 'User already exists' });
        }
        // Encrypt password to store in the db
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
            ...req.body,
            password: passwordHash
        });
        await newUser.save();
        // Create a sessionToken that is unique to one person _id and JWT Secret
        const sessionToken = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
        );
        res.json({ message: 'Sign up successful', sessionToken });
    } catch (err) {
        res.json({ error: err });
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
        res.json({ message: "Login Successful", sessionToken, user: user });

    } catch(err) {
        res.json({error: err});
        console.log(err);
    }
});

//update user
userRouter.put("/updateUser/:user_ID", async (req, res) => {
    try {
        // Check if the user exists
        const user_id = req.params.user_ID;
        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            return res.json({ error: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { ...req.body },
            { new: true }
        );
        //if user has no changes, return an error
        if (!updatedUser) {
            return res.json({ error: 'User must have changes to update' });
        }
        //return the updated user
        res.json({ notice: 'User updated successfully', message: updatedUser });
    } catch (err) {
        res.json({ error: err.message });
    }
});

//delete user
userRouter.delete("/deleteUser/:user_ID", async (req, res) => {
    try {
        const user_id = req.params.user_ID;
        // Check if the user exists
        const existingUser = await User.findById(user_id)
        if (!existingUser) {
            return res.json({ error: 'User not found' });
        }
        //Delete the User
        await existingUser.deleteOne();
        res.json({ notice: 'User deleted successfully' });
    } catch (err) {
        res.json({ error: err.message });
    }
})

export default userRouter