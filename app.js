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


const {
  validateLoginBody,
  validateUserBody,
} = require("./validations/validation");


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


app.post("/signup", validateUserBody, createUser);
app.post("/login", validateLoginBody, loginUser);
app.post("/openai/haiku", generateHaiku);

app.use(routes);

app.use(errorLogger); // winston
app.use(errors()); // celebrate
app.use(errorHandler); // centralized error handler

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
