const port = 3001;

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const allRoutes = require("./routes/allRoutes");

const app = require("express")();

const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "pm-app"

const dbURI = `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("static"));
app.use(morgan("dev"));

app.use("/", allRoutes);

app.listen(port, () => {
    console.log(`The server is ready and listening on port ${port}.`)
});

