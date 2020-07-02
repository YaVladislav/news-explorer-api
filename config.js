require('dotenv').config();

const { JWT_SECRET = 'DEV_SECRET_KEY' } = process.env;
const { DB_PATH = 'mongodb://localhost:27017/db' } = process.env;
const { PORT = 3000 } = process.env;

module.exports = {
  JWT_SECRET,
  DB_PATH,
  PORT,
};
