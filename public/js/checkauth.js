import * as api from './api.js';

const auth = JSON.parse(localStorage.getItem('auth'));
if(auth) {
  api.login(auth.nickname, auth.pass).then(res => {
    if(!res.success) {
      localStorage.removeItem('auth');
      localStorage.removeItem('user');

      location.reload();
    }
  })  
}

