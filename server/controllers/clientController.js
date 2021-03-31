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
            res.status(409).json({message: error.message});
        }
    },

    findAll: async (req, res) => {
        try {
            // const filter = { clientName: { $eq: "Visa" } }; This shit works!
            // const filter = {status: "active"};
            // const filter = {status: "active", projects: {$exists: true, $not: {$size: 0}}};
            // const allClients = await Client
            //     .find(filter)
            //     .lean()
            //     .select("_id clientName")
            //     .populate({
            //         path: "projects",
            //         select: {"projectName": 1, "_id": 1}
            //     });

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

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundClient = await Client
                .findById(id)
                .select("_id");
            // .select("-_id");
            res.status(200).json(foundClient);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = clientController;
