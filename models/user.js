const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: Date,
});

const userSchema = new mongoose.Schema({
  username: String,
  log: [logSchema],
});

module.exports = mongoose.model("User", userSchema);
