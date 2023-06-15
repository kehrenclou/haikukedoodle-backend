require("dotenv").config({path:__dirname + `/../.env`});
const jwtSecret = "1234";
module.exports = { jwtSecret, openaiKey: process.env.REACT_APP_OPENAI_API_KEY };
