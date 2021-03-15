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
router.post("/users", userController.createUser);
router.get("/users", userController.findAllUsers);
router.get("/users/:id", userController.findUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users/:id/tasks", userController.getAllTasks);

// Clients
router.post("/clients", clientController.createClient);
router.get("/clients", clientController.findAllClients);
router.get("/clients/:id", clientController.findClient);

// Project
router.post("/projects", projectController.createProject);
router.get("/projects", projectController.findAllProjects);

// Tasks
router.get("/tasks", taskController.findAllTasks);
router.post("/tasks", taskController.createTask);

module.exports = router;