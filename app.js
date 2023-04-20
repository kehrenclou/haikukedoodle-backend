//backend/app.js
/* --------------------------------- imports -------------------------------- */
const express = require("express");

/* -------------------------- declare app and port -------------------------- */
const app = express();
const { PORT = 3001 } = process.env;

/* ----------------------------------- app ---------------------------------- */
app.use(express.json()); //versions express >4.16 can use this instead of bodyparser
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
