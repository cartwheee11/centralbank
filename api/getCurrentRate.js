const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await db.query(q.Map(
    q.Paginate(q.Documents(q.Collection('rate'))),
    q.Lambda('elem', q.Get(q.Var('elem')))
  ));

  const currentRate = result.data[0].data.current

  res.json(currentRate)
}