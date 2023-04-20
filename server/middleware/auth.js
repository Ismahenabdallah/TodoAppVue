const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')
const asyncHandler = require('express-async-handler');

// const verifyTokenMethodeTwo = async(req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ message: "please active your account" });
//     }const decoded= jwt.verify(token,process.env.PRIVATE_KEY )
//     const user = await User.findById(decoded._id)
//     req.user=user;
//     next();
//   } catch (error) {}
// };
const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })

        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}



const verifyToken = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            const user = await User.findById(decoded._id);
            req.user = user;

            console.log(req.user);

            next();
        } catch (error) {
            throw new Error("Not authorized, invalid token, or account not active.");
        }
    } else {
        res.status(401).json({ error: "Not authorized, invalid token, or account not active." });
    }
});


module.exports = { verifyToken }





