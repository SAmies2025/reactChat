import { Schema, model, Types } from "mongoose";
const messageSchema = new Schema({
    datetime: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    room: [{
        type: Types.ObjectId,
        ref: 'Room'
    }]
});

export default model('Message', messageSchema)