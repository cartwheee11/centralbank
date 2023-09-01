import * as api from './api.js';

const auth = JSON.parse(localStorage.getItem('auth'));
if(auth) {
  api.login(auth.nickname, auth.pass).then(res => {
    if(!res.success) {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');

      location.reload();
    } else {
      localStorage.setItem('user', JSON.stringify(res.user))
      if(res.user.role == 'admin') {

        const el = document.createElement('a');
        el.href = '/cp.html';
        console.log(res.user.role)
        el.style = 'position: fixed; bottom: 10px; right: 10px; background-color: #f5cb7c; padding: 10px 20px; color: #6a4808; border-radius: 100px; box-shadow: 0px 7px 21px 0 rgba(34, 60, 80, 0.2);';
        el.innerText = 'Контрольная панель';
        document.body.append(el);
      }
    }
  })  
}



