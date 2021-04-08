const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const clientController = require("../controllers/clientController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

// https://dev.to/itz_giddy/how-to-build-dynamic-mongoose-queries-2ka8
// https://masteringjs.io/tutorials/mongoose/aggregate
// https://mongoosejs.com/docs/populate.html#populate_multiple_documents
// https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
// https://chunkofcode.net/how-to-deep-populate-using-mongodb-and-mongoose/

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Users
// router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users/:id/tasks", userController.getAllTasks);

// Clients
router.post("/clients", clientController.create);
router.get("/clients", clientController.findAll);
router.get("/clients/:id", clientController.findOne);
router.put("/clients/:id", clientController.edit);

// Project
router.post("/projects", projectController.create);
router.get("/projects", projectController.findAll);
router.get("/projects/:id", projectController.findOne);
router.put("/projects/:id", projectController.edit);

// Tasks
router.post("/tasks", taskController.create);
router.get("/tasks", taskController.findAllActive);
router.get("/tasks/completed", taskController.findAllComplete);
router.get("/tasks/:id", taskController.findOne);
router.get("/tasks/responsible/:id", taskController.findTasksOfUser);
router.delete("/tasks/:id", taskController.delete);
router.patch("/tasks/:id", taskController.complete);
router.put("/tasks/:id", taskController.edit);

module.exports = router;