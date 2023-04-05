const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
