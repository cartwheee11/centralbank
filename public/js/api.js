export async function submit(name, email, reason) {
  const res = await fetch('/api/submit', {
    method: 'post',
    body: JSON.stringify({name, email, reason})
  });

  const json = res.json();
  return json;
}

export async function login(nickname, pass) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify({nickname, pass})
  });

  console.log(res)

  const json = res.json();
  return json;
}

export async function getCpData() {

  const authJSON = localStorage.getItem('auth');
  console.log(authJSON)
  if(authJSON) {
    const res = await fetch('/api/getCpData', {
      method: 'post',
      body: authJSON
    });

    console.log(res)

    const json = res.json();
    return json;
  } else {
    alert('Вы не авторизованы');
  }

  
}

export async function register(nickname, email, reason, pass, registration) {
  console.log(nickname, email, reason, pass, registration)

  const auth = JSON.parse(localStorage.getItem('auth'));

  const res = await fetch('/api/register', {
    method: 'post',
    body: JSON.stringify({nickname, email, reason, pass, registration, auth})
  });

  const json = res.json();
  return json;
}

export async function removeSubmission(ref) {

  const auth = JSON.parse(localStorage.getItem('auth'));

  const res = await fetch('/api/removeSubmission', {
    method: 'post',
    body: JSON.stringify({ref: ref + '', auth})
  });

  const json = res.json();
  return json;
}

export async function removeUser(ref) {

  const auth = JSON.parse(localStorage.getItem('auth'));

  const res = await fetch('/api/removeUser', {
    method: 'post',
    body: JSON.stringify({ref: ref + '', auth})
  });

  const json = res.json();
  return json;
}