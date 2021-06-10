const Project = require("../models/project");
const Client = require("../models/client");

const projectController = {

    create: async (req, res) => {
        try {
            const {projectName, createdBy, clientId} = req.body;
            const newProject = new Project({projectName, createdBy, clientId});
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
            const allProjects = await Project
                .find()
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    }
                ]);
            res.status(200).json(allProjects);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findAllCount: async (req, res) => {
        try {
            const allProjects = await Project.find();
            res.status(200).json(allProjects.length);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundProject = await Project
                .findById(id)
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "tasks",
                        select: {"taskName": 1, "startDate": 1, "endDate": 1, "responsible": 1, "_id": 1, "status": 1},
                        populate: {
                            path: "responsible",
                            select: {"username": 1, "_id": 1}
                        }
                    }
                ]);
            res.status(200).json(foundProject);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    edit: async (req, res) => {
        try {
            const {projectName} = req.body;
            const id = req.params.id;
            const updatedProject = await Project.findByIdAndUpdate(id, {
                "$set": {
                    projectName
                }
            });
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = projectController;