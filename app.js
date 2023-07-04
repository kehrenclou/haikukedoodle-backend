require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");
const { limiter } = require("./utils/rate-limit-config");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { dbAddress } = require("./utils/config");

const { createUser, loginUser } = require("./controllers/users");
const { generateHaiku } = require("./controllers/openai");

const routes = require("./routes");
// const usersRouter = require("./routes/users");
// const cardsRouter = require("./routes/cards");

const {
  validateLoginBody,
  validateUserBody,
} = require("./validations/validation");
const auth = require("./middlewares/auth");

const NotFoundError = require("./errors/not-found");
const errorHandler = require("./middlewares/errorHandler");

/* -------------------------- declare app and port -------------------------- */
const app = express();
const { PORT = 3001 } = process.env;

// mongoose.connect("mongodb://127.0.0.1/hkkd_db");
mongoose.connect(dbAddress);

/* ----------------------------------- app ---------------------------------- */
app.use(requestLogger);
app.use(limiter); // applies to all requests
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use(express.json()); // versions express >4.16 can use this instead of bodyparser
app.use(express.urlencoded({ extended: false }));

// crash test - remove after review paases
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Server will crash now');
//   }, 0);
// });

// routes  routes/index.js contains 53-62 import user and cards router
// instead of app.post, etc look at router.post, rouwter.use like cards.js route etc.
// here is app.use(routes)//investigate
app.post("/signup", validateUserBody, createUser);
app.post("/login", validateLoginBody, loginUser);
app.post("/openai/haiku", generateHaiku);

app.use(routes);
// app.use("/users", auth, usersRouter);
// app.use("/cards", cardsRouter);

// app.use((req, res, next) => {
//   next(new NotFoundError("This route does not exist"));
// });

app.use(errorLogger); // winston
app.use(errors()); // celebrate
app.use(errorHandler); // centralized error handler

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
