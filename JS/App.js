import { renderPolls, renderMemes } from './renderers.js';
import { escapeHtml } from './utils.js';

async function fetchPollsData() {
  const res = await fetch('/api/fetch_polls.php');
  return await res.json();
}

async function loadPolls() {
  const polls = await fetchPollsData();
  const el = document.getElementById('polls');
  if (!el) return;
  renderPolls(polls, el);
}

async function fetchMemesData() {
  const res = await fetch('/api/fetch_memes.php');
  return await res.json();
}

async function loadMemes() {
  const memes = await fetchMemesData();
  const el = document.getElementById('memes');
  if (!el) return;
  renderMemes(memes, el);
}

// Helps to populate homepage-specific elements (featured and preview sections)
async function populateHomepage() {
  const featuredPollEl = document.getElementById('featuredPoll');
  const featuredMemeEl = document.getElementById('featuredMeme');
  const pollPreviewCard = document.getElementById('pollPreviewCard');
  const memePreviewCard = document.getElementById('memePreviewCard');
  if (!featuredPollEl && !featuredMemeEl && !pollPreviewCard && !memePreviewCard) return;

  const [polls, memes] = await Promise.all([fetchPollsData(), fetchMemesData()]);

  // Featured poll: includes the first poll with full interactive display
  if (featuredPollEl) {
    const p = polls && polls[0];
    if (p) {
      featuredPollEl.innerHTML = '<h3>Featured Poll</h3>';
      const pollContainer = document.createElement('div');
      pollContainer.className = 'preview poll-preview';
      renderPolls([p], pollContainer);
      featuredPollEl.appendChild(pollContainer);
    } else {
      featuredPollEl.innerHTML = '<h3>Featured Poll</h3><div class="preview poll-preview">No featured poll available.</div>';
    }
  }

  // Featured meme: displays the first meme
  if (featuredMemeEl) {
    const m = memes && memes[0];
    const container = featuredMemeEl.querySelector('.preview.meme-preview');
    if (m && container) {
      container.innerHTML = `<div class="meme-img"><img src="/uploads/${encodeURIComponent(m.filename)}" alt="${escapeHtml(m.caption || '')}" style="max-width:100%;height:auto;"></div><p class="caption">${escapeHtml(m.caption || '')}</p><div class="meta">by ${escapeHtml(m.username)}</div>`;
    } else if (container) {
      container.textContent = 'No featured meme available.';
    }
  }

  // Preview cards - latest poll with full interactive display
  if (pollPreviewCard) {
    const p = polls && polls[1] || polls && polls[0];
    if (p) {
      renderPolls([p], pollPreviewCard);
    } else {
      pollPreviewCard.textContent = 'No poll previews.';
    }
  }

  if (memePreviewCard) {
    const m = memes && memes[1] || memes && memes[0];
    if (m) {
      renderMemes([m], memePreviewCard);
    } else {
      memePreviewCard.textContent = 'No meme previews.';
    }
  }
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
