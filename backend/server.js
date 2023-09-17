require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// express app: middleware
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes

//require router in workouts.js  (router -> contains all the routes in workouts.js)
const workoutRoutes = require("./routes/workouts");
const userRoutes = require('./routes/user')

// use the workoutRoutes on the app
// use the url= localhost:4000/api/workouts/(id) for workout request
// api/(foldername in routes)
app.use("/api/workouts", workoutRoutes);
app.use('/api/user', userRoutes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests once we connect to db
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
