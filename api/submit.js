

const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { name, email, reason } = JSON.parse(req.body);

  if(name, email, reason) {
    db.query(q.Create(q.Collection('submissions'), {
      data: {
        name, email, reason
      }
    })).then(() => {
      res.json({ success: true });
    }).catch((e) => {
      res.json({ success: false, message: e })
    })
  }
}