const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { nickname, email, reason, pass, registration } = JSON.parse(req.body);

  if(nickname && email && reason && pass && registration) {
    db.query(q.Create(q.Collection('users'), {
      data: {
        nickname, email, reason, pass, registration
      }
    })).then(() => {
      res.json({ success: true });
    }).catch((e) => {
      res.json({ success: false, message: 'Ошибка базы данных (вероятно, пользователь с таким ником уже существует). Текст ошибки:' + JSON.stringify(e) })
    })
  } else {
    res.json({success: false, message: 'поля не должны быть пустыми'})
  }
}