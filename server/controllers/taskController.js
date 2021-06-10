const Task = require("../models/task");
const Project = require("../models/project");

const taskController = {
    create: async (req, res) => {
        try {
            const {taskName, createdBy, clientId, projectId, startDate, endDate, responsible} = req.body;
            const newTask = new Task({taskName, createdBy, clientId, projectId, startDate, endDate, responsible});
            await Project.findByIdAndUpdate(projectId, {
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

            await newTask.save();
            res.status(200).json(newTask);

        } catch (error) {
            res.status(409).json({message: error.message});
        }


    },

    findAllActive: async (req, res) => {
        try {
            const filter = {status: "active"};
            const allTasks = await Task
                .find(filter)
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "projectId",
                        select: {"projectName": 1, "_id": 1}
                    },
                    {
                        path: "responsible",
                        select: {"username": 1, "_id": 1}
                    }]);
            res.status(200).json(allTasks);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findAllActiveCount: async (req, res) => {
        try {
            const filter = {status: "active"};
            const allTasks = await Task.find(filter);
            res.status(200).json(allTasks.length);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findAllComplete: async (req, res) => {
        try {
            const filter = {status: "complete"};
            const allTasks = await Task
                .find(filter)
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "projectId",
                        select: {"projectName": 1, "_id": 1}
                    },
                    {
                        path: "responsible",
                        select: {"username": 1, "_id": 1}
                    }]);
            res.status(200).json(allTasks);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findAll: async (req, res) => {
        try {
            const allTasks = await Task
                .find()
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "projectId",
                        select: {"projectName": 1, "_id": 1}
                    },
                    {
                        path: "responsible",
                        select: {"username": 1, "_id": 1}
                    }]);
            res.status(200).json(allTasks);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const foundTask = await Task
                .findById(id)
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "projectId",
                        select: {"projectName": 1, "_id": 1}
                    },
                    {
                        path: "responsible",
                        select: {"username": 1, "_id": 1}
                    }]);
            res.status(200).json(foundTask);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    findTasksOfUser: async (req, res) => {
        try {
            const id = req.params.id;
            const foundTask = await Task
                .find({status: "active", responsible: {$all: [id]}})
                .populate([
                    {
                        path: "clientId",
                        select: {"clientName": 1, "_id": 1}
                    },
                    {
                        path: "projectId",
                        select: {"projectName": 1, "_id": 1}
                    },
                    {
                        path: "responsible",
                        select: {"username": 1, "_id": 1}
                    }]);
            res.status(200).json(foundTask);

        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedTask = await Task.findByIdAndDelete(id);
            res.status(200).json(deletedTask);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    complete: async (req, res) => {
        try {
            const id = req.params.id;
            const completedTask = await Task.findByIdAndUpdate(id,
                {$set: {status: "complete"}});
            res.status(200).json(completedTask);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },

    edit: async (req, res) => {
        try {
            const {taskName, clientId, projectId, startDate, endDate, responsible} = req.body;
            const id = req.params.id;
            const updatedTask = await Task.findByIdAndUpdate(id, {
                "$set": {
                    taskName,
                    clientId,
                    projectId,
                    startDate,
                    endDate,
                    responsible
                }
            });
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = taskController;