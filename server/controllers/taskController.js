const Task = require("../models/task");
const Project = require("../models/project");
const User = require("../models/user");

const taskController = {

    findAllTasks: async (req, res) => {
        const allTasks = await Task.find();
        // const allTasks = await Task.find({ responsible: { "$in" : ["604d20cdc4beba262c820772"]} })
        //     .select("projectId taskName startDate endDate clientId")
        //     .populate("projectId", { projectName: 1, clientId: 1 })
        //     .populate({
        //         path: "projectId",
        //         populate: { path: "clientId" }
        //     });
        res.json(allTasks);
    },

    createTask: async (req, res) => {
        const { taskName, createdBy, projectId, startDate, endDate, responsible } = req.body;
        const newTask = new Task({ taskName, createdBy, projectId, startDate, endDate, responsible });

        const updatedProject = await Project.findByIdAndUpdate(projectId, {
            "$push": {
                tasks: newTask
            }
        });

        // await Promise.all(responsible.map(async (id) => {
        //     await User.findByIdAndUpdate(id, {
        //         $push: {
        //             tasks: newTask
        //         }
        //     });
        // }));

        const savedTask = await newTask.save();
        const message = `${ taskName } successfully created!`;
        res.json(message);
    }
}

module.exports = taskController;