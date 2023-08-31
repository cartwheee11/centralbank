

const db = require('../src/service/getDb.js');

const fauna = require('faunadb');
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { nickname, pass } = JSON.parse(req.body);

  console.log(JSON.parse(req.body), nickname, pass);
  if(nickname && pass) {
    const response = await db.query(
      q.Map(
        q.Paginate(q.Match(q.Index('user_by_nickname'), nickname)),
        q.Lambda('elem', q.Get(q.Var('elem')))
      )
    )

    if(response.data[0]) {
      const user = response.data[0].data;
      if (pass === user.pass) {
        const { nickname, birthDate, registration, role, email, deposit } = user;

        res.json({ success: true, user: {
          nickname, birthDate, registration, role, email, deposit
        } })
      } else {
        res.json({ success: false, message: "Вы ввели неверный пароль" })
      }
    } else {
      res.json({ success: false, message: "Пользователь с таким именем не найден" })
    }
  } else {
    res.json({ success: false, message: "Поля не должны быть пустыми" })
  }
}