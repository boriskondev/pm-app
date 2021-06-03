const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const clientController = require("../controllers/clientController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/loggedIn", authController.loggedIn);
router.get("/loggedUser", authController.getLoggedUserInfo);

// Users
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.get("/users/:id/tasks", userController.getAllTasks);
router.patch("/users/:id", userController.updateUser);
// router.delete("/users/:id", userController.deleteUser);

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
router.get("/tasksAll", taskController.findAll);
router.get("/tasks/completed", taskController.findAllComplete);
router.get("/tasks/:id", taskController.findOne);
router.get("/tasks/responsible/:id", taskController.findTasksOfUser);
router.delete("/tasks/:id", taskController.delete);
router.patch("/tasks/:id", taskController.complete);
router.put("/tasks/:id", taskController.edit);

module.exports = router;