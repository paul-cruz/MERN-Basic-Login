const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../config/db');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const db = mongoose
    .connect(config.MONGODB_URI, dbOptions)
    .then(() =>
      console.log(chalk.blue.bold('Database:'), chalk.green.bold('Connected')),
    )
    .catch((e) =>
      console.log(chalk.blue.bold('Database:'), chalk.red.bold('Error\n'), e),
    );

module.exports = db;