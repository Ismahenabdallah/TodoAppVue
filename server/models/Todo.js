const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    text: String,
    photo: String,

    postedBy: { type: ObjectId, ref: "users" },









},
    { timestamps: true }

);
module.exports = mongoose.model('todos', userSchema)