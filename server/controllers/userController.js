const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {saltRounds, secret} = require("../config/config");

const userController = {

    findAll: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundUser = await User
                .findById(id)
                .select({"username": 1, "email": 1, "department": 1})
            ;
            res.status(200).json(foundUser);
        } catch (err) {
            res.status(404).json({message: error.message});
        }

    },

    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const {username, password, repeatPassword} = req.body;

            // Validation
            if (!username || !password) {
                return res.status(400).json({errorMessage: "Please enter all required fields."});
            }

            // if (password.length < 6) {
            //     return res.status(400).json({errorMessage: "Please enter a password of at least 6 characters."});
            // }

            if (password !== repeatPassword) {
                return res.status(400).json({errorMessage: "Please enter the same password twice."});
            }

            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userToUpdate = await User.findByIdAndUpdate(id,
                {$set: {username: username, password: hashedPassword}});

            // Sign the token
            const token = jwt.sign({
                userId: userToUpdate._id,
                username: userToUpdate.username
            }, secret);

            // Send to token in HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: true,
            }).send();
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    getAllTasks: async (req, res) => {
        const id = req.params.id;
        const foundUser = await User.findById(id);
        res.json(foundUser);
    },

    deleteUser: async (req, res) => {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        const message = `User ${deletedUser.username} successfully deleted!`
        res.json(message);
    }
}

module.exports = userController;
