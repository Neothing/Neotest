const dotenv     = require('dotenv').config();

module.exports = {
  default: {
    database: process.env.DATABASE,
    port: process.env.PORT
  }
}