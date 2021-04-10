const User = require("../models/user");

const userController = {

    create: async (req, res) => {
        const {username, department, email, password} = req.body;
        const newUser = new User({username, department, email, password});

        try {
            await newUser.save();
            res.status(200).json(newUser);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    },

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
            const foundUser = await User.findById(id);
            res.status(200).json(foundUser);
        } catch (err) {
            res.status(404).json({message: error.message});
        }

    },

    deleteUser: async (req, res) => {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        const message = `User ${deletedUser.username} successfully deleted!`
        res.json(message);
    },

    updateUser: async (req, res) => {
        const id = req.params.id;
        const {username, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            "$set": {
                username,
                password
            }
        });
        const message = `User ${username} successfully edited!`
        res.json(message);
    },

    getAllTasks: async (req, res) => {
        const id = req.params.id;
        const foundUser = await User.findById(id);
        res.json(foundUser);
    }
}

module.exports = userController;
