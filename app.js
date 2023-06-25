require("dotenv").config(); //moved to openai config

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");
const { limiter } = require("./utils/rate-limit-config");


const { createUser, loginUser } = require("./controllers/users");
const { generateHaiku } = require("./controllers/openai");
const {
  validateLoginBody,
  validateUserBody,
} = require("./validations/validation");
const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const NotFoundError = require("./errors/not-found");
const { createCard } = require("./controllers/cards");

/* -------------------------- declare app and port -------------------------- */
const app = express();
const { PORT = 3001 } = process.env;

// mongoose.connect("mongodb://localhost:27017/hkkd_db");//older node versions
mongoose.connect("mongodb://127.0.0.1/hkkd_db");

/* ----------------------------------- app ---------------------------------- */
app.use(limiter); //applies to all requests
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use(express.json()); //versions express >4.16 can use this instead of bodyparser
app.use(express.urlencoded({ extended: false }));

//routes
app.post("/signup", validateUserBody, createUser);
app.post("/login", validateLoginBody, loginUser);

app.use("/users", auth, usersRouter);
app.use("/cards", cardsRouter);

app.post("/openai/haiku", generateHaiku);

app.use((req, res, next) => {
  next(new NotFoundError("This route does not exist"));
});

app.use(errors()); //celebrate

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
