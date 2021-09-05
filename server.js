const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", require("./routes/users"));
app.use("/api/users", require("./routes/exercises"));
app.use("/api/users", require("./routes/logs"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
