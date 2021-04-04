// https://www.positronx.io/react-mern-stack-crud-app-tutorial/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const port = 4000;
const database = "mongodb+srv://boriskondev:boriskondev123@cluster0.d5skl.mongodb.net/pm-app?retryWrites=true&w=majority";

// const port = process.env.PORT || 5000;
// const database = process.env.DB_URI;

const allRoutes = require("./routes/allRoutes");

mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("MongoDB Atlas connected."))
    .then(() => app.listen(port, () => {
        console.log(`The server is ready and listening on port ${port}.`)
    }))
    .catch((err) => console.log("Could not connect to MongoDB Atlas: " + err));

const app = express();
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

app.use("/", allRoutes);


