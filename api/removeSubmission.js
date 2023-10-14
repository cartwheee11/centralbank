

const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { auth, ref } = JSON.parse(req.body);


  fetch(req.headers.origin + '/api/login', {
    method: 'post',
    body: JSON.stringify(auth)
  }).then(res => res.json()).then(async json => {
    if(json.success && json.user.role == 'Менеджер') {
      if(ref) {
        db.query(q.Delete(
          q.Ref(q.Collection('submissions'), ref + '')
        )).then(() => {
          res.json({ success: true });
        }).catch((e) => {
          res.json({ success: false, message: JSON.stringify(e) })
        })
      }
    } else {
      res.json({success: false, message: 'Вы не вошли в личный кабинет'})
    }
  })

  
}