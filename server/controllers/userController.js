const User = require("../models/user");

const userController = {

    findAllUsers: async (req, res) => {
        const allUsers = await User.find();
        // const allUsers = await User.find().select("_id");
        res.json(allUsers);
    },

    createUser: async (req, res) => {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        const savedUser = await newUser.save();
        const message = `User ${username} successfully created!`
        res.json(message);
    },

    findUser: async  (req, res) => {
        try {
            const id = req.params.id;
            const foundUser = await User.findById(id);
            res.json(foundUser);
        } catch (err) {
            res.json("User does not exist. Try again.");
        }

    },

    deleteUser: async (req, res) => {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        const message = `User ${ deletedUser.username } successfully deleted!`
        res.json(message);
    },

    updateUser: async (req, res) => {
        const id = req.params.id;
        const { username, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            "$set": {
                username,
                password
            }
        });
        const message = `User ${ username } successfully edited!`
        res.json(message);
    },

    getAllTasks: async (req, res) => {
        const id = req.params.id;
        const foundUser = await User.findById(id);
        res.json(foundUser);
    }
}

// https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2
// https://medium.com/@brandon.lau86/node-js-express-and-mongodb-get-started-fast-e3a0a09dd41f

module.exports = userController;
