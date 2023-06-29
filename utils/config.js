const { NODE_ENV, JWT_SECRET, DB_ADDRESS } = process.env; // secret saved on server in .env file
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : '1234';

const openaiKey = process.env.OPENAI_API_KEY;
const dbAddress = NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1/hkkd_db';

module.exports = { jwtSecret, openaiKey, dbAddress };
