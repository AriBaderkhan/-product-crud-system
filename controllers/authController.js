const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { registerUser, loginUser } = require('../models/authModel');


const authControllerRegister = async (req, res) => {
    const { name, email, password, role } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    registerUser(name, email, hashPassword, role, (err, respond) => {
        if (err) {
            if (err.code === "23505") {
                return res.status(400).send("Email already exists");
            }
            return res.status(500).send(err);
        }
        res.status(200).send("User Registered Successfully");
    });
}

const authControllerLogin = async (req, res) => {
    const { email, password } = req.body;

    loginUser(email, async (err, respond) => {

        if (err) return res.status(500).send("DB Error");

        if (respond.rows.length === 0) {
            return res.status(400).send("user not found"); // if user not exsit in DB the email
        }

        const hashedPassword = respond.rows[0].password; // get the password from DB
        const isMatch = await bcrypt.compare(password,hashedPassword); // for comparing password if match or not by async/await
        if (!isMatch) return res.status(400).send("Incorrect password"); 
         const token = jwt.sign(
                {
                    userId: respond.rows[0].id,
                    name:respond.rows[0].name,
                    role: respond.rows[0].role,
                    email: respond.rows[0].email
                },
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRES_IN}
            );
            res.status(200).json({
                messaage:"Logged in successfully",
                token
        });
    });
}

module.exports = { authControllerRegister, authControllerLogin };


     // bcrypt.compare(password, hashedPassword, (error, isMatch) => {
        //     if (error) return res.status(500).send("Something went wrong");
        //     if (!isMatch) return res.status(400).send("Incorrect password");
        //     const token = jwt.sign(
        //         {
        //             userId: respond.rows[0].id,
        //             role: respond.rows[0].role,
        //             email: respond.rows[0].email
        //         },
        //         process.env.JWT_SECRET,
        //         {expiresIn: process.env.JWT_EXPIRES_IN}
        //     );
        //     res.status(200).json({
        //         messaage:"Logged in successfully",
        //         token
        //     });