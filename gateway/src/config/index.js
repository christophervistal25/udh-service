const dotenv = require("dotenv");
const path = require("path");
const configFile = `${__dirname}${path.sep}..${path.sep}..${path.sep}.env`;
dotenv.config({ path: configFile });
module.exports = {
  PORT: process.env.PORT,
};