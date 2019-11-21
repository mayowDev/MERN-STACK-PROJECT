const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//============> MiddleWare
app.use(cors());
app.use(express.json());

// ===============>  connect to mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// connect our server to the database
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb Database sucessfully established");
});

// ==============> require the routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

// =======> use the required routes . this endpoint we get , post request
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

//listen our express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
