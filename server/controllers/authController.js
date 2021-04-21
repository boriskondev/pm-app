const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {saltRounds, secret} = require("../config/config");

const register = async (req, res) => {
    try {
        const {username, department, email, password, repeatPassword} = req.body;

        // Validation
        if (!username || !department || !email || !password) {
            return res.status(400).json({errorMessage: "Please enter all required fields."});
        }

        // if (password.length < 6) {
        //     return res.status(400).json({errorMessage: "Please enter a password of at least 6 characters."});
        // }

        if (password !== repeatPassword) {
            return res.status(400).json({errorMessage: "Please enter the same password twice."});
        }

        const existingUser = await User.findOne({email: email});

        if (existingUser) {
            return res.status(400).json({errorMessage: "An account with this email already exists."});
        }

        // Hashing
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            department,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign({
            userId: savedUser._id,
            username: savedUser.username
        }, secret);

        // Send to token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

const login = async (req, res) => {

    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({errorMessage: "Please enter all required fields."});
        }

        const existingUser = await User.findOne({email: email});

        if (!existingUser) {
            return res.status(401).json({errorMessage: "Wrong email or password."});
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);

        console.log(passwordCorrect)

        if (!passwordCorrect) {
            return res.status(401).json({errorMessage: "Wrong email or password."});
        }

        // Sign the token
        const token = jwt.sign({
            userId: existingUser._id,
            username: existingUser.username
        }, secret);

        // Send to token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send();

    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
}

const loggedIn = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json(false);
        }

        jwt.verify(token, secret);

        res.send(true);

    } catch (err) {
        res.json(false);
    }
}

const getLoggedUserInfo = (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, secret);

        res.json(verified);

    } catch (err) {
        res.json(false);
    }
}

module.exports = {
    register,
    login,
    logout,
    loggedIn,
    getLoggedUserInfo
}