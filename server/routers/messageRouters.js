import { Router } from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Room from "../models/Room.js";
import isAdmin from "../middlewares/isAdmin.js";
import validateSession from "../middlewares/validatesession.js";

const messageRouter = Router();

//get all messages
messageRouter.get("/allMessages", async (req, res) => {
    try {
        const allMessages = await Message.find({});
        res.json({
            message: 'list of all messages',
            messages: allMessages
        })
    } catch (err) {
        res.json({ error: err.message})
    }
});

//get all messages in a room
messageRouter.get("/messages/:room_ID", async (req, res) => {
    try {
        const room_ID = req.params.room_ID;
        const roomMessages = await Message.find({ room: room_ID});
        const room = await Room.findOne({ _id: room_ID});
        res.json({
            message: `Messages in room: ${room.roomName}`,
            messages: roomMessages
        })
    } catch (err) {
        res.json({ error: err.message})
    }
});

//create a new message
messageRouter.post("/createMessage", validateSession, async (req, res) => {
    try {
        const newMessage = new Message({
            ...req.body
        });
        await newMessage.save();
        res.json({ notice: 'message created successfully', message: newMessage})
    } catch (err) {
        res.json({ error: err.message})
    }
});

//update message
messageRouter.put("/updateMessage/:message_ID", isAdmin, async (req, res) => {
    try {
        // Check if the message exists
        const message_id = req.params.message_ID;
        const existingMessage = await Message.findById(message_id);
        if (!existingMessage) {
            return res.json({ error: 'Message not found' });
        }
        const updatedMessage = await Message.findByIdAndUpdate(
            message_id,
            { ...req.body },
            { new: true }
        );
        //if message has no changes, return an error
        if (!updatedMessage) {
            return res.json({ error: 'Message must have changes to update' });
        }
        //return the updated message
        res.json({ notice: 'Message updated successfully', message: updatedMessage });
    } catch (err) {
        res.json({ error: err.message });
    }
})

//delete message
messageRouter.delete("/deleteMessage/:message_ID", isAdmin, async (req, res) => {
    try {
        const message_id = req.params.message_ID;
        // Check if the message exists
        const existingMessage = await Message.findById(message_id)
        if (!existingMessage) {
            return res.json({ error: 'Message not found' });
        }
        //Delete the message
        await existingMessage.deleteOne();
        res.json({ notice: 'Message deleted successfully' });
    } catch (err) {
        res.json({ error: err.message });
    }
})

export default messageRouter;