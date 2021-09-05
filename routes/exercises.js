const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

router.post("/:_id/exercises", async (req, res) => {
  // creating a user
  const id = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date =
    new Date(req.body.date).toDateString() || new Date().toDateString();
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (description && id && duration && isValid) {
    try {
      let user = await User.findOne({ _id: id });

      if (!user) {
        res.status(401).json({ error: "id has not been found" });
      } else {
        user.log.push({
          description: description,
          date: date,
          duration: duration,
        });
        await user.save();

        res.json({
          username: user.username,
          description: description,
          duration: duration,
          date: date,
          _id: user._id,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json({ error: "invalid input data" });
  }
});

module.exports = router;
