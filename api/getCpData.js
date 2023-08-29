const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { nickname, pass } = JSON.parse(req.body);
  // console.log(req.headers.origin)

  fetch(req.headers.origin + '/api/login', {
    method: 'post',
    body: JSON.stringify({nickname, pass})
  }).then(res => res.json()).then(async json => {
    if(json.success) {
      const user = json.user;
      if (user.role != 'admin'){
        res.json({ success: false, message: 'вы не админ' });
        return;
      } 

      const response = await db.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('submissions')), { size: 999999 }),
          q.Lambda('elem', q.Get(q.Var('elem')))
        )
      )

      res.json({
        success: true,
        submissions: response.data
      })
    } else {
      res.json({
        success: false,
        message: 'Доступ запрещен'
      })
    }
  })
}