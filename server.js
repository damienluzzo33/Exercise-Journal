const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/workouts");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
});

app.use(router);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});