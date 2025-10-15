import { escapeHtml } from './utils.js';
import { vote } from './api.js';

export function renderPolls(polls, container) {
  container.innerHTML = '';
  for (const p of polls) {
    const div = document.createElement('div');
    div.className = 'poll';
    div.innerHTML = `<strong>${escapeHtml(p.question)}</strong><div>by ${escapeHtml(p.author)} - ${p.total_votes} votes</div>`;
    for (const o of p.options) {
      const btn = document.createElement('button');
      btn.textContent = `${o.option_text} (${o.votes})`;
      btn.onclick = async () => {
        const j = await vote(p.id, o.id);
        if (j.success) { const newPolls = await fetch('/api/fetch_polls.php').then(r=>r.json()); renderPolls(newPolls, container); } else { alert(j.error || 'Vote failed'); }
      };
      div.appendChild(btn);
    }
    container.appendChild(div);
  }
}

export function renderMemes(memes, container) {
  container.innerHTML = '';
  for (const m of memes) {
    const div = document.createElement('div');
    div.className = 'meme';
    div.innerHTML = `<div><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%; height:auto;"></div><div>${escapeHtml(m.caption || '')} — ${escapeHtml(m.username)}</div>`;
    container.appendChild(div);
  }
}
