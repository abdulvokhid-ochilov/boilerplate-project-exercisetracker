const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/:_id/logs", async (req, res) => {
  // creating a user

  const id = req.params._id;
  const from = req.query.from
    ? new Date(req.query.from)
    : new Date("1970-01-01");
  const to = req.query.to ? new Date(req.query.to) : new Date();
  const limit = parseInt(req.query.limit) || 100;

  if (id) {
    try {
      let user = await User.findOne({ _id: id }).lean();

      if (!user) {
        res.status(401).json({ error: "id has not been found" });
      } else {
        let logs = [];
        user.log.forEach((log) => {
          if (new Date(log.date) > from && new Date(log.date) < to) {
            log.date = log.date.toDateString();
            delete log._id;
            logs.push(log);
          }
        });

        res.json({
          username: user.username,
          count:
            logs.length < limit ? logs.length : logs.slice(0, limit).length,
          _id: user._id,
          log: logs.length < limit ? logs : logs.slice(0, limit),
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json({ error: "invalid id" });
  }
});

module.exports = router;
