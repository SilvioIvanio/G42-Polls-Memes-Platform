document.getElementById('pollForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { question: fd.get('question'), options: fd.get('options').split(',').map(s => s.trim()).filter(Boolean) };
    const res = await fetch('/api/create_poll.php', { method: 'POST', body: JSON.stringify(payload) });
    const j = await res.json();
    document.getElementById('msg').innerText = j.success ? 'Poll created' : (j.error || 'Failed');
});