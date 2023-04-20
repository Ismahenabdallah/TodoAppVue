const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    email: String,
    password: String,
    confirm: String,




},
    { timestamps: true }

);
module.exports = mongoose.model('users', userSchema)