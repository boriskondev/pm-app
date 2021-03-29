const express = require("express");

const userController = require("../controllers/userController");
const clientController = require("../controllers/clientController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

const router = express.Router();

// https://dev.to/itz_giddy/how-to-build-dynamic-mongoose-queries-2ka8
// https://masteringjs.io/tutorials/mongoose/aggregate
// https://mongoosejs.com/docs/populate.html#populate_multiple_documents
// https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
// https://chunkofcode.net/how-to-deep-populate-using-mongodb-and-mongoose/

// Users
router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users/:id/tasks", userController.getAllTasks);

// Clients
router.post("/clients", clientController.create);
router.get("/clients", clientController.findAll);
router.get("/clients/:id", clientController.findOne);

// Project
router.post("/projects", projectController.create);
router.get("/projects", projectController.findAll);
router.get("/projects/:id", projectController.findOne);

// Tasks
router.post("/tasks", taskController.create);
router.get("/tasks", taskController.findAll);
router.get("/tasks/:id", taskController.findOne);
router.get("/tasks/responsible/:id", taskController.findTasksOfUser);
router.delete("/tasks/:id", taskController.delete);

module.exports = router;