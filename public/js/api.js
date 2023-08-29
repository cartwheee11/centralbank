export async function submit(name, email, reason) {
  const res = await fetch('/api/submit', {
    method: 'post',
    body: JSON.stringify({name, email, reason})
  });

  const json = res.json();
  return json;
}