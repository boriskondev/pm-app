const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const allRoutes = require("./routes/allRoutes");

const port = process.env.PORT || 4000;
const database = process.env.DB_URI;

const app = express();
app.listen(port, () => {
    console.log(`The server is ready and listening on port ${port}.`)
});

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(morgan("dev"));

mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((err) => console.log("Could not connect to MongoDB Atlas: " + err));

app.use("/", allRoutes);


