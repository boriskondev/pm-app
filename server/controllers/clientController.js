const Client = require("../models/client");

// https://www.restapitutorial.com/httpstatuscodes.html

const clientController = {

    create: async (req, res) => {
        const {clientName, createdBy} = req.body;
        const newClient = new Client({clientName, createdBy});

        try {
            await newClient.save();
            res.status(200).json(newClient);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            // const filter = { clientName: { $eq: "Visa" } }; This shit works!
            const filter = { status: "active" };
            const allClients = await Client
                .find(filter)
                .lean()
                .populate({
                    path: "projects",
                    select: { "projectName": 1, "tasks": 1, "_id": 1 },
                    populate: {
                        path: "tasks",
                        select: { "taskName": 1, "startDate": 1, "endDate": 1,  "responsible": 1, "_id": 0 },
                        populate: {
                            path: "responsible",
                            match: { _id: "604e776fbe4a5b41f0834477" },
                            select: { "username": 1, "_id": 0 }
                        }
                    }
                });

            res.status(200).json(allClients);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }

    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundClient = await Client.findById(id);
            res.status(200).json(foundClient);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = clientController;
