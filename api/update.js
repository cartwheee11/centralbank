
require('dotenv').config();

const fauna = require('faunadb');
const db = require('../src/service/getDb.js');

const q = fauna.query;

const fcaKey = process.env.FCA_SECRET

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  fetch(`http://api.freecurrencyapi.com/v1/latest?apikey=${fcaKey}`).then(res => res.json()).then(json => {
    const cur = json.data["PLN"];
    console.log(json)
    console.log(cur)

    db.query(
      q.Update(
        q.Ref(q.Collection('rate'), '374216964969595472'),
        { data: { current: cur } }
      )
    ).then(() => {
      res.json({ success: true })
    }).catch(e => {
      res.json({ success: false, message: e })
    })
  });
}

