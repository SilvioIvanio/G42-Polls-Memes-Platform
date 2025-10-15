async function fetchPollsData() {
  const res = await fetch('/api/fetch_polls.php');
  return await res.json();
}

async function loadPolls() {
  const polls = await fetchPollsData();
  const el = document.getElementById('polls');
  if (!el) return;
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

async function fetchMemesData() {
  const res = await fetch('/api/fetch_memes.php');
  return await res.json();
}

async function loadMemes() {
  const memes = await fetchMemesData();
  const el = document.getElementById('memes');
  if (!el) return;
  el.innerHTML = '';
  for (const m of memes) {
    const div = document.createElement('div');
    div.className = 'meme';
    div.innerHTML = `<div><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%; height:auto;"></div><div>${escapeHtml(m.caption || '')} — ${escapeHtml(m.username)}</div>`;
    el.appendChild(div);
  }
}

// Populate homepage-specific elements (featured and preview sections)
async function populateHomepage() {
  const featuredPollEl = document.getElementById('featuredPoll');
  const featuredMemeEl = document.getElementById('featuredMeme');
  const pollPreviewCard = document.getElementById('pollPreviewCard');
  const memePreviewCard = document.getElementById('memePreviewCard');
  if (!featuredPollEl && !featuredMemeEl && !pollPreviewCard && !memePreviewCard) return;

  const [polls, memes] = await Promise.all([fetchPollsData(), fetchMemesData()]);

  // Featured poll: first poll
  if (featuredPollEl) {
    const p = polls && polls[0];
    if (p) {
      featuredPollEl.querySelector('.question')?.remove();
      featuredPollEl.querySelector('.choices')?.remove();
      featuredPollEl.innerHTML = `<h3>Featured Poll</h3><div class="preview poll-preview"><strong>${escapeHtml(p.question)}</strong><div class="meta">by ${escapeHtml(p.author)} — ${p.total_votes} votes</div></div>`;
    } else {
      featuredPollEl.querySelector('.question')?.textContent = 'No featured poll available.';
    }
  }

  // Featured meme: first meme
  if (featuredMemeEl) {
    const m = memes && memes[0];
    const container = featuredMemeEl.querySelector('.preview.meme-preview');
    if (m && container) {
      container.innerHTML = `<div class="meme-img"><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%;height:auto;"></div><p class="caption">${escapeHtml(m.caption || '')}</p><div class="meta">by ${escapeHtml(m.username)}</div>`;
    } else if (container) {
      container.textContent = 'No featured meme available.';
    }
  }

  // Preview cards
  if (pollPreviewCard) {
    const p = polls && polls[1] || polls && polls[0];
    if (p) {
      pollPreviewCard.innerHTML = `<strong>${escapeHtml(p.question)}</strong><div class="meta">by ${escapeHtml(p.author)} — ${p.total_votes} votes</div>`;
    } else {
      pollPreviewCard.textContent = 'No poll previews.';
    }
  }

  if (memePreviewCard) {
    const m = memes && memes[1] || memes && memes[0];
    if (m) {
      memePreviewCard.innerHTML = `<div><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%;height:auto;"></div><div>${escapeHtml(m.caption || '')} — ${escapeHtml(m.username)}</div>`;
    } else {
      memePreviewCard.textContent = 'No meme previews.';
    }
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// Run page-specific loaders
loadPolls();
loadMemes();
populateHomepage();

// Simple nav highlight: add .active to current page link
(function highlightNav() {
  try {
    const parts = location.pathname.split('/');
    const page = parts.pop() || parts.pop(); // handle trailing slash
    document.querySelectorAll('.nav-actions a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const hrefPage = href.split('/').pop();
      if (hrefPage === page) a.classList.add('active');
    });
  } catch (e) { /* ignore */ }
})();
