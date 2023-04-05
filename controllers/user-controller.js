const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

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

const addUser = async (req, res) => {
  const user = new User(req.body);
  if (await User.findOne({ email: req.body.email })) {
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
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(req);
  if (!user) {
    return res
      .status(400)
      .json({ message: `Пользователь с почтой ${email} not found` });
  }
  const validPassword = bcrypt.compareSync(`${password}`, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: `Пороль не верный` });
  }
  const token = generateAccessToken(user._id, user.roles);
  return res.json({ token });
};
const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const condidate = await User.findOne({ email });
    if (condidate) {
      return res.status(400).json({
        message: `Пользователь с почтой ${email} уже зарегестрирован!`,
      });
    }
    const hashPassword = bcrypt.hashSync(`${password}`, 7);
    const user = new User({
      name: username,
      email,
      password: hashPassword,
      roles: "USER",
    });
    await user.save();
    return res.json({ message: "Пользователь зарегестрирован!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Неизвестная ошибка!" });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
  userLogin,
  registration,
};
