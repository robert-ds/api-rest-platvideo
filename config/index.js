require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUSER: process.env.DB_USER,
  dbPASSWORD: process.env.DB_PASSWORD,
  dbHOST: process.env.DB_HOST,
  dbNAME: process.env.DB_NAME
}

module.exports = { config };