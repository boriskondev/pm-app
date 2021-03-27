const Task = require("../models/task");
const Project = require("../models/project");

const taskController = {

    create: async (req, res) => {
        const {taskName, createdBy, projectId, startDate, endDate, responsible} = req.body;
        const newTask = new Task({taskName, createdBy, projectId, startDate, endDate, responsible});

        try {
            await Project.findByIdAndUpdate(projectId, {
                "$push": {
                    tasks: newTask
                }
            });

            await newTask.save();
            res.status(200).json(newTask);

        } catch (error) {
            res.status(409).json({message: error.message});
        }

        // await Promise.all(responsible.map(async (id) => {
        //     await User.findByIdAndUpdate(id, {
        //         $push: {
        //             tasks: newTask
        //         }
        //     });
        // }));
    },

    findAll: async (req, res) => {

        try {
            const allTasks = await Task.find();
            res.status(200).json(allTasks);

        } catch (error) {
            res.status(404).json({message: error.message});
        }

        // const allTasks = await Task.find({ responsible: { "$in" : ["604d20cdc4beba262c820772"]} })
        //     .select("projectId taskName startDate endDate clientId")
        //     .populate("projectId", { projectName: 1, clientId: 1 })
        //     .populate({
        //         path: "projectId",
        //         populate: { path: "clientId" }
        //     });
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundTask = await Task.findById(id);
            res.status(200).json(foundTask);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = taskController;