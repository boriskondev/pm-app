// https://www.positronx.io/react-mern-stack-crud-app-tutorial/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const allRoutes = require("./routes/allRoutes");

const user = "boriskondev";
const pass = "boriskondev123";
const dbname = "pm-app";

const dbURI = `mongodb+srv://${user}:${pass}@cluster0.d5skl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Atlas connected."))
    .catch((err) => console.log("Could not connect to MongoDB Atlas: " + err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/", allRoutes);

const port = 4000;

app.listen(port, () => {
    console.log(`The server is ready and listening on port ${port}.`)
});

