const validator = require("validator");
const asynHandler = require('express-async-handler');
const User = require("../models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

require('dotenv').config()
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const Register = asynHandler(async (req, res) => {
    try {
        const { email, password, confirm } = req.body
        if (!email || !password || !confirm)
            return res.status(400).json({ message: "Please fill in all fields." })
        if (!validateEmail(email))
            return res.status(400).json({ message: "Invalid emails." })
        if (!validator.equals(password, confirm))
            return res.status(400).json({ message: "Passwords not matches." })
        const user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ message: "email already exist. " })


        const passwordHash = bcrypt.hashSync(password, 12)
        const newUser = new User({
            ...req.body
            , password: passwordHash, confirm: passwordHash
        })
        //jwt.sign(email, process.env.PRIVATE_KEY, { expiresIn: '15m' })

        await newUser.save()

        res.status(200).json({ newUser, message: "success" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
const Login = asynHandler(async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email || !password)
            return res.status(422).json({ message: "please add email or password" })

        const user = await User.findOne({ email: email })
        if (!user)
            return res.status(400).json({ message: "This email does not exist." })



        ///await is important 
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Password is incorrect." })

        } else {
            var token = jwt.sign({
                _id: user._id,
                email: user.email,

            }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            res.status(200).json({
                message: "success",
                token: "Bearer " + token,
                


            })
        }




    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

module.exports = {
    Register,
    Login
}