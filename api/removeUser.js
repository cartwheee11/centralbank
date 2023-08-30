

const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const ref = req.body;

  console.log(ref)

  if(ref) {
    db.query(q.Delete(
      q.Ref(q.Collection('users'), ref + '')
    )).then(() => {
      res.json({ success: true });
    }).catch((e) => {
      res.json({ success: false, message: JSON.stringify(e) })
    })
  }
}