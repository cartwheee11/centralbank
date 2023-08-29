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