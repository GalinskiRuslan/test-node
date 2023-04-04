const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
/* const { connectToDb, getDb } = require("./db"); */
/* const { ObjectId } = require("mongodb"); */
const mongoose = require("mongoose");
const User = require("./models/users");
const userRouter = require("./routes/user-routes");

const URL =
  "mongodb+srv://galinskirus:gal4815162342war@cluster0.abm33bz.mongodb.net/usersbox?retryWrites=true&w=majority";

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection to mongo"))
  .catch((err) => console.log(err));

/* let db; */

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Example app listening on port ${port}!`)
);

app.use(express.json());
app.use(userRouter);

/*  */

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));

app.get("/about", (req, res) => res.render("about"));
