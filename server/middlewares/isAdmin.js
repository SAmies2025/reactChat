import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function isAdmin(req, res, next) {
    try{
         // Get token from Authorization header
        const sessionToken = req.headers.authorization; // must be added to the value of the Authorization Key in the Headers in PostMan to test!
        if (!sessionToken) {
            return res.json ({ error: "No token provided!" })
        }
        // Verify and decode token
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        // Find user by ID from token
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.json({ error: "Invalid Token" })
        }
        if (!user.isAdmin) {
            return res.json ({ error: "Nope. You are NOT an ADMIN!"})
        }
        req.user = user;
        next(); //continue on to the route handler

    } catch (err) {
        res.json({ error: err });
    }
}