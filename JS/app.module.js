import { fetchPollsData, fetchMemesData } from './api.js';
import { renderPolls, renderMemes } from './renderers.js';
import { attachLogout, highlightNav } from './nav.js';

// Apply saved theme on page load
function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

async function init() {
  applyTheme();
  highlightNav();
  attachLogout();

  // load lists if containers exist
  const pollsEl = document.getElementById('polls');
  if (pollsEl) {
    const polls = await fetchPollsData();
    renderPolls(polls, pollsEl);
  }

  const memesEl = document.getElementById('memes');
  if (memesEl) {
    const memes = await fetchMemesData();
    renderMemes(memes, memesEl);
  }

  // homepage-specific population
  const featuredPollEl = document.getElementById('featuredPoll');
  const featuredMemeEl = document.getElementById('featuredMeme');
  const pollPreviewCard = document.getElementById('pollPreviewCard');
  const memePreviewCard = document.getElementById('memePreviewCard');
  if (featuredPollEl || featuredMemeEl || pollPreviewCard || memePreviewCard) {
    const [polls, memes] = await Promise.all([fetchPollsData(), fetchMemesData()]);
    if (featuredPollEl) {
      const p = polls && polls[0];
      if (p) featuredPollEl.innerHTML = `<h3>Featured Poll</h3><div class="preview poll-preview"><strong>${p.question}</strong><div class="meta">by ${p.author} — ${p.total_votes} votes</div></div>`;
    }
    if (featuredMemeEl) {
      const m = memes && memes[0];
      if (m) featuredMemeEl.querySelector('.preview.meme-preview').innerHTML = `<div class="meme-img"><img src="/uploads/${encodeURIComponent(m.filename)}" style="max-width:100%;height:auto;"></div><p class="caption">${m.caption}</p><div class="meta">by ${m.username}</div>`;
    }
    if (pollPreviewCard) {
      const p = polls && (polls[1] || polls[0]);
      if (p) pollPreviewCard.innerHTML = `<strong>${p.question}</strong><div class="meta">by ${p.author} — ${p.total_votes} votes</div>`;
    }
    if (memePreviewCard) {
      const m = memes && (memes[1] || memes[0]);
      if (m) memePreviewCard.innerHTML = `<div><img src="/uploads/${encodeURIComponent(m.filename)}" style="max-width:100%;height:auto;"></div><div>${m.caption} — ${m.username}</div>`;
    }
  }
}

init();
