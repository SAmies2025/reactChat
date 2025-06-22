import { Schema, model, Types } from "mongoose";
const roomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addedUsers: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
});

export default model('Room', roomSchema)