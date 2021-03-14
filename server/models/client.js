const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    projects: [{
        type: Schema.Types.ObjectID,
        ref: "Project"
    }],
    status: {
        type: String,
        default: "active"
    }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

