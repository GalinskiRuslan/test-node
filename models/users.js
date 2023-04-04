const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  roles: {
    type: String,
    require: true,
    ref: "Role",
  },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
