const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => res.json({ username: "Flavio" }));

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
app.use("/schedule", schedulesRouter);
app.use("/measurements", measurementsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
