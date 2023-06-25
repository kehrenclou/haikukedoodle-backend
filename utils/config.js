const { NODE_ENV, JWT_SECRET } = process.env; // secret saved on server in .env file
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : '1234';
const openaiKey = process.env.REACT_APP_OPENAI_API_KEY;

module.exports = { jwtSecret, openaiKey };
