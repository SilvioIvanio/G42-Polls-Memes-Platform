import { fetchPollsData, fetchMemesData, getUserProfile } from './api.js';
import { renderPolls, renderMemes, renderSinglePoll } from './renderers.js';
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

  const user = await getUserProfile();

  // load lists if containers exist
  const pollsEl = document.getElementById('polls');
  if (pollsEl) {
    const polls = await fetchPollsData();
    renderPolls(polls, pollsEl, user);
  }

  const memesEl = document.getElementById('memes');
  if (memesEl) {
    const memes = await fetchMemesData();
    renderMemes(memes, memesEl, user);
  }

  // homepage-specific population
  // Featured and preview sections with isolated single polls/memes in article cards
  const featuredPollCard = document.getElementById('featuredPollCard');
  const featuredMemeCard = document.getElementById('featuredMemeCard');
  const featuredPoll = document.getElementById('featuredPoll');
  const featuredMeme = document.getElementById('featuredMeme');
  const pollPreviewCard = document.getElementById('pollPreviewCard');
  const memePreviewCard = document.getElementById('memePreviewCard');
  
  if (featuredPollCard || featuredMemeCard || featuredPoll || featuredMeme || pollPreviewCard || memePreviewCard) {
    const [polls, memes] = await Promise.all([fetchPollsData(), fetchMemesData()]);
    
    // Featured poll card (index.html)
    if (featuredPollCard && polls && polls[0]) {
      renderSinglePoll(polls[0], featuredPollCard, true, user);
    }
    
    // Featured meme card (index.html)
    if (featuredMemeCard && memes && memes[0]) {
      renderMemes([memes[0]], featuredMemeCard, user);
    }
    
    // Featured poll item (homepage.html) - with .featured-item class
    if (featuredPoll && polls && polls[0]) {
      const preview = featuredPoll.querySelector('.preview.poll-preview');
      if (preview) {
        preview.innerHTML = '';
        renderSinglePoll(polls[0], preview, true, user);
      }
    }
    
    // Featured meme item (homepage.html) - with .featured-item class
    if (featuredMeme && memes && memes[0]) {
      const preview = featuredMeme.querySelector('.preview.meme-preview');
      if (preview) {
        preview.innerHTML = '';
        renderMemes([memes[0]], preview, user);
      }
    }
    
    // Latest poll preview - isolated single poll in article card
    if (pollPreviewCard && polls && (polls[1] || polls[0])) {
      const p = polls[1] || polls[0];
      renderSinglePoll(p, pollPreviewCard, true, user);
    }
    
    // Latest meme preview - isolated single meme in article card
    if (memePreviewCard && memes && (memes[1] || memes[0])) {
      const m = memes[1] || memes[0];
      renderMemes([m], memePreviewCard, user);
    }
  }
}

init();
