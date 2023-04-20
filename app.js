//backend/app.js
/* --------------------------------- imports -------------------------------- */
const express = require("express");
const mongoose = require('mongoose');

/* -------------------------- declare app and port -------------------------- */
const app = express();
const { PORT = 3001 } = process.env;

// mongoose.connect("mongodb://localhost:27017/hkkd_db");//older node versions
mongoose.connect('mongodb://127.0.0.1/hkkd_db');

/* ----------------------------------- app ---------------------------------- */
app.use(express.json()); //versions express >4.16 can use this instead of bodyparser
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
