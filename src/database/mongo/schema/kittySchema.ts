import mongoose from "mongoose";

const kittySchema = new mongoose.Schema({
    name: 'string',
    size: 'string'
});

export const kitty = mongoose.model('kittySchema', kittySchema);
