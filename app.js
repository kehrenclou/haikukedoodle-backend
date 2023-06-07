//backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors =require('cors');

const { createUser, loginUser } = require("./controllers/users");
const {
  validateLoginBody,
  validateUserBody,
} = require("./middlewares/validation");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const NotFoundError = require("./errors/not-found");

/* -------------------------- declare app and port -------------------------- */
const app = express();
const { PORT = 3001 } = process.env;

// mongoose.connect("mongodb://localhost:27017/hkkd_db");//older node versions
mongoose.connect("mongodb://127.0.0.1/hkkd_db");

/* ----------------------------------- app ---------------------------------- */
//TODO: delete this temp user idwhen all is working
app.use((req, res, next) => {
  req.user = {
    _id: "647ce03e3b12fb49a2e9bdce",
  };
  next();
});
//
app.use(cors());
app.options('*',cors());

app.use(express.json()); //versions express >4.16 can use this instead of bodyparser
app.use(express.urlencoded({ extended: false }));

app.post("/signup", validateUserBody, createUser);
app.post("/login", validateLoginBody, loginUser);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("This route does not exist"));
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
