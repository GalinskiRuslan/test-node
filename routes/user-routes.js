const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  userLogin,
} = require("../controllers/user-controller");

const router = express.Router();

// Mongoose req
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.get("/login", userLogin);

module.exports = router;

// Взаимодействие с Монго без Монгуса
/* 
  
  connectToDb((err) => {
    if (!err) {
  
      db = getDb();
    } else {
      console.log(`error connection DB ${err}`);
    }
  }); 
  
  
  
  app.get("/users", (req, res) => {
    const users = [];
  
    db.collection("users")
      .find()
      .forEach((user) => {
        users.push(user);
      })
      .then(() => {
        res.status(200).json(users);
      });
  });
  app.get("/users/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      db.collection("users")
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch(() => {
          res.status(500).json({ error: "This error" });
        });
    } else {
      res.status(500).json({ error: "This error id not a valid" });
    }
  });
  app.post("/user-registr", (req, res) => {
    db.collection("users")
      .insertOne(req.body)
      .then((result) => {
        console.log(res.status(201).json(result));
      })
      .catch(() => {
        console.log(res.status(500).json({ error: "This error" }));
      });
  });
  app.delete("/users/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      db.collection("users")
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(() => {
          res.status(500).json({ error: "This error" });
        });
    } else {
      res.status(500).json({ error: "This error id not a valid" });
    }
  });
  app.patch("/users/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
      db.collection("users")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(() => {
          res.status(500).json({ error: "This error" });
        });
    } else {
      res.status(500).json({ error: "This error id not a valid" });
    }
  }); */
