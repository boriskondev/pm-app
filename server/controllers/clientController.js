const Client = require("../models/client");

const clientController = {
    create: async (req, res) => {
        try {
            const {clientName, createdBy} = req.body;
            const newClient = new Client({clientName, createdBy});
            await newClient.save();
            res.status(200).json(newClient);
        } catch (error) {
            res.status(409).json({message: error.message});
        }
    },

    findAll: async (req, res) => {
        try {
            // const filter = { status: "active" };
            const allClients = await Client
                .find()
                .lean()
                .populate({
                    path: "projects",
                    populate: {
                        path: "tasks",
                        populate: {
                            path: "responsible",
                        }
                    }
                });

            res.status(200).json(allClients);
        } catch (error) {
            res.status(404).json({message: error.message});
        }

    },

    findAllCount: async (req, res) => {
        try {
            // const filter = { status: "active" };
            const allClients = await Client.find();
            res.status(200).json(allClients.length);
        } catch (error) {
            res.status(404).json({message: error.message});
        }

    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundClient = await Client
                .findById(id)
                .select({"clientName": 1, "_id": 1, "createdBy": 1})
                .populate({
                    path: "projects"
                });
            // .select("-_id");
            res.status(200).json(foundClient);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    edit: async (req, res) => {
        try {
            const {clientName} = req.body;
            const id = req.params.id;
            const updatedClient = await Client.findByIdAndUpdate(id, {
                "$set": {
                    clientName
                }
            });
            res.status(200).json(updatedClient);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = clientController;
