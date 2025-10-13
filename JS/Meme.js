document.getElementById('memeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const res = await fetch('/api/upload_meme.php', { method: 'POST', body: fd });
    const j = await res.json();
    document.getElementById('msg').innerText = j.success ? 'Meme uploaded' : (j.error || 'Failed');
});