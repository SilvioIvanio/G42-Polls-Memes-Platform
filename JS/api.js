// api.js - small wrapper around backend endpoints
export async function fetchPollsData() {
  const res = await fetch('/api/fetch_polls.php');
  return await res.json();
}

export async function fetchMemesData() {
  const res = await fetch('/api/fetch_memes.php');
  return await res.json();
}

export async function vote(poll_id, option_id) {
  const res = await fetch('/api/vote.php', { method: 'POST', body: JSON.stringify({ poll_id, option_id }) });
  return await res.json();
}

export async function logout() {
  const res = await fetch('/api/logout.php', { method: 'POST' });
  try { return await res.json(); } catch (e) { return { success: false }; }
}

export async function login(identifier, password) {
  // send JSON payload (identifier can be email or username)
  const res = await fetch('/api/login.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ identifier, password }) });
  return await res.json();
}

export async function register(username, email, password) {
  const res = await fetch('/api/register.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, password }) });
  return await res.json();
}

export async function createPoll(question, options) {
  const res = await fetch('/api/create_poll.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, options }) });
  return await res.json();
}

export async function uploadMeme(formData) {
  const res = await fetch('/api/upload_meme.php', { method: 'POST', body: formData });
  return await res.json();
}
