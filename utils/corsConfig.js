const allowedCors = [
  "https://api.haikukedoodle.com",
  "https://www.haikukedoodle.com",
  "https://haikukedoodle.com",
  "localhost:3000",
  "localhost:3001",
];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
