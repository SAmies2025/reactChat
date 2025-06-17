import { Router } from "express";
import Room from "../models/Room.js";

//ititalize the router
const roomRouter = Router();

//view existing rooms
roomRouter.get("/allRooms", async (req, res) => {
    try{
        const allRooms = await Room.find({});
        res.json({
            message: 'list of all rooms',
            rooms: allRooms
        });
        

    } catch (err) {
        res.json({ error: err.message });
    };

});

//view a specific room by id
roomRouter.get("/:roomName", async (req, res) => {
    try {
        const roomName = req.params.roomName;
        const room = await Room.findOne({ roomName: roomName})
        res.json({
            message: `Details of room with id: ${roomName}`,
            room: room
        });

    } catch (err) {
        res.json({ error: err.message });
    };
});

//Create a new room
roomRouter.post('/createRoom', async (req, res) => {
    try {
        //check if room already exists
        const existingRoom = await Room.findOne({roomName: req.body.roomName})
        if (existingRoom) {
            return res.json({ error: 'Room already exists' });
        }
        //checks if room name contains spaces so they can be used as a url param
        if (req.body.roomName.includes(' ')) {
            return res.json({ error: 'Room name cannot contain spaces' });
        }
        const newRoom = new Room({
            ...req.body
        })
        await newRoom.save();
        res.json({ message: 'Room created successfully', room: newRoom });
    } catch (err) {
        res.json({ error: err.message });
    }

});

export default roomRouter;