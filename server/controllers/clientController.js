const Client = require("../models/client");
const User = require("../models/user");
const mongoose = require("mongoose");

const clientController = {
    findAllClients: async (req, res) => {
        // const filter = { clientName: { $eq: "Visa" } }; This shit works!
        const filter = { status: "active" };
        const allClients = await Client
            .find(filter)
            .lean()
            .populate({
                path: "projects",
                select: { "projectName": 1, "tasks": 1, "_id": 0 },
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

        res.json(allClients);
    },

    createClient: async (req, res) => {
        const {clientName, createdBy} = req.body;
        const newClient = new Client({clientName, createdBy});
        const savedClient = await newClient.save();
        const message = `${clientName} successfully created!`
        res.json(message);
    },

    findClient: async (req, res) => {
        try {
            const id = req.params.id;
            const foundClient = await Client.findById(id);
            res.json(foundClient);
        } catch (err) {
            res.json("Client does not exist. Try again.");
        }

    },
}

module.exports = clientController;
