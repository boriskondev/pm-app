const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectID,
        ref: "Project",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    responsible: [{
        type: Schema.Types.ObjectID,
        ref: "User"
    }],
    status: {
        type: String,
        default: "active"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;