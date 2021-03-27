const Project = require("../models/project");
const Client = require("../models/client");

const projectController = {

    create: async (req, res) => {
        const {projectName, createdBy, clientId} = req.body;
        const newProject = new Project({projectName, createdBy, clientId});

        try {
            await Client.findByIdAndUpdate(clientId, {
                "$push": {
                    projects: newProject
                }
            });

            await newProject.save();
            res.status(200).json(newProject);

        } catch (error) {
            res.status(409).json({message: error.message});
        }
    },

    findAll: async (req, res) => {
        try {
            const allProjects = await Project.find();
            res.status(200).json(allProjects);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundProject = await Project
                .findById(id)
                .populate({
                    path: "tasks",
                    // select: { "taskName": 1, "startDate": 1, "endDate": 1,  "responsible": 1, "_id": 1 },
                    populate: {
                        path: "responsible",
                        select: { "username": 1, "_id": 1 }
                }});
            res.status(200).json(foundProject);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = projectController;