

const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { auth, ref, data } = JSON.parse(req.body);

  fetch(req.headers.origin + '/api/login', {
    method: 'post',
    body: JSON.stringify(auth)
  }).then(res => res.json()).then(async json => {
    console.log(json)
    if(json.success && json.user.role == 'admin') {
      if(ref) {
        // изменить в соответсвии с data
        db.query(
          q.Update(
            q.Ref(q.Collection('users'), ref),
            {
              data
            }
          )
        ).then(response => {
          res.json({ success: true, data: response.data })
        }).catch(e => {
          res.json({ success: false, message: JSON.stringify(e) });
        })
      }
    } else {
      res.json({success: false, message: 'авторизация не пройдена'})
    }
  })

  
}