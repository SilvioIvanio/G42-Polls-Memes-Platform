document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { email: fd.get('email'), password: fd.get('password') };
    const res = await fetch('/api/login.php', { method: 'POST', body: JSON.stringify(payload) });
    const j = await res.json();
    if (j.success) { window.location = '/index.html'; } else { document.getElementById('msg').innerText = j.error || 'Login failed'; }
});