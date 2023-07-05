const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mintues
  max: 100, // Limit each IP to 100 requests per 'window'(here per 15 minutes)
  standardHeaders: true, // return rate limit infor in the 'Ratelimit-*' headers legacy
  Headers: false, // Disable the 'X-RateLimit-*' headers
});

module.exports = { limiter };
