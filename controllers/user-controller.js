const User = require("../models/users");
const Role = require("../models/Role");

const getUsers = (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users);
  });
};
const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "This error" });
    });
};
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
const addUser = (req, res) => {
  const user = new User(req.body);
  if (User.findOne(req.body.email)) {
    return res.status(400).json({ message: "this mail registred!" });
  } else {
    user
      .save()
      .then((result) => {
        console.log(res.status(201).json(result));
      })
      .catch(() => {
        console.log(res.status(500).json({ error: "This error" }));
      });
  }
};
const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(500).json({ error: "This error" });
    });
};
const userLogin = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  const validPassword = password == User.findOne({ email }).password;
  if (!user) {
    return res.status(400).json({ message: `User witch ${email} not found` });
  } else {
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  userLogin,
};
