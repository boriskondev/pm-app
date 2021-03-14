const Project = require("../models/project");
const Client = require("../models/client");

const projectController = {

    findAllProjects: async (req, res) => {
        const allProjects = await Project.find();
            // .where("clientId").equals("604d2210c4beba262c820777")
            // .populate("createdBy", { username: 1 });
        res.json(allProjects);
    },

    createProject: async (req, res) => {
        const { projectName, createdBy, clientId } = req.body;
        const newProject = new Project({projectName, createdBy, clientId});

        const updatedClient = await Client.findByIdAndUpdate(clientId, {
            "$push": {
                projects: newProject
            }
        });

        const savedProject = await newProject.save();
        const message = `${ projectName } successfully created!`
        res.json(message);
    }
}

module.exports = projectController;