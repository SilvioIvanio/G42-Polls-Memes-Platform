async function loadPolls() {
  const res = await fetch('/api/fetch_polls.php');
  const polls = await res.json();
  const el = document.getElementById('polls');
  el.innerHTML = '';
  for (const p of polls) {
    const div = document.createElement('div');
    div.className = 'poll';
    div.innerHTML = `<strong>${escapeHtml(p.question)}</strong><div>by ${escapeHtml(p.author)} - ${p.total_votes} votes</div>`;
    for (const o of p.options) {
      const btn = document.createElement('button');
      btn.textContent = `${o.option_text} (${o.votes})`;
      btn.onclick = async () => {
        const r = await fetch('/api/vote.php', { method: 'POST', body: JSON.stringify({ poll_id: p.id, option_id: o.id }) });
        const j = await r.json();
        if (j.success) { loadPolls(); } else { alert(j.error || 'Vote failed'); }
      };
      div.appendChild(btn);
    }
    el.appendChild(div);
  }
}

async function loadMemes() {
  const res = await fetch('/api/fetch_memes.php');
  const memes = await res.json();
  const el = document.getElementById('memes');
  el.innerHTML = '';
  for (const m of memes) {
    const div = document.createElement('div');
    div.className = 'meme';
    div.innerHTML = `<div><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%; height:auto;"></div><div>${escapeHtml(m.caption || '')} — ${escapeHtml(m.username)}</div>`;
    el.appendChild(div);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

loadPolls();
loadMemes();
