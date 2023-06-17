// require("dotenv").config({path:__dirname + `/../.env`});
const jwtSecret = "1234";
const openaiKey= process.env.REACT_APP_OPENAI_API_KEY;

module.exports = { jwtSecret, openaiKey, };
