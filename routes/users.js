const express = require("express");
const router = express.Router();
const User = require("../models/user");

router
  .route("/")
  .post(async (req, res) => {
    // creating a user
    const username = req.body.username;

    if (username !== undefined && username.length > 0) {
      try {
        let user = await User.findOne({ username: username }).select(
          "-log -__v"
        );

        if (user) {
          res.json(user);
        } else {
          user = new User({
            username: username,
          });

          await user.save();

          res.json({ username: user.username, _id: user._id });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
      }
    } else {
      res.status(401).json({ error: "invalid username" });
    }
  })
  .get(async (req, res) => {
    //   finding all users
    try {
      let users = await User.find({}).select("-log");
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  });

module.exports = router;
