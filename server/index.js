const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// require("dotenv").config();

const allRoutes = require("./routes/allRoutes");

const port = 4000;
const database = "mongodb+srv://boriskondev:boriskondev123@cluster0.d5skl.mongodb.net/pm-app?retryWrites=true&w=majority";

// const port = process.env.PORT || 5000;
// const database = process.env.DB_URI;

const app = express();
app.listen(port, () => {
    console.log(`The server is ready and listening on port ${port}.`)
});

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((err) => console.log("Could not connect to MongoDB Atlas: " + err));

app.use("/", allRoutes);


