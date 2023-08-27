require('dotenv').config()

const fauna = require("faunadb");

let db = new fauna.Client({
  secret: process.env.DB_SECRET,
  domain: "db.fauna.com",
  scheme: "https",
  port: 443,
});

module.exports = db;
