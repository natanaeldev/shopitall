const env = process.env.NODE_ENV || "development";
const configs = require("./knexfile")[env];
const knexjs = require("knex");
const knex = knexjs(configs);

module.exports = knex;
