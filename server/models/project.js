const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectID,
        ref: "Client",
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectID,
        ref: "Task",
    }],
    status: {
        type: String,
        default: "active"
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

