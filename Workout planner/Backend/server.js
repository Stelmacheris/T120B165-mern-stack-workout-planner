const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
let Workout = require("./models/workout.model");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/allworkouts", async (req, res) => {
  const workouts = await Workout.find({});
  res.json({ workouts, status: 200 });
});

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
}

connect();

const usersRouter = require("./routes/users");
const workoutsRouter = require("./routes/workouts");
const commentsRouter = require("./routes/comments");
const schedulesRouter = require("./routes/schedule");
const measurementsRouter = require("./routes/measurements");

app.use("/", usersRouter);
app.use("/workout", workoutsRouter);
app.use("/comments", commentsRouter);
app.use("/:userId/schedule", schedulesRouter);
app.use("/:userId/measurements", measurementsRouter);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ message: "Error in body" });
  } else {
    next();
  }
});
app.post("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.put("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.delete("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});