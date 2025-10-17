import { createPoll } from './api.js';
import { validatePoll } from './validation.js';
import { attachLogout, highlightNav } from './nav.js';

// Apply saved theme on page load
function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize
applyTheme();
highlightNav();
attachLogout();

const form = document.getElementById('pollForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const question = fd.get('question');
        const options = (fd.get('options') || '').split(',').map(s => s.trim()).filter(Boolean);
        const allow_multiple_votes = fd.get('allow_multiple_votes') === 'on';
        const v = validatePoll(question, options);
        const msg = document.getElementById('msg');
        if (!v.valid) { if (msg) msg.innerText = v.error; return; }
        const j = await createPoll(question, options, allow_multiple_votes);
        if (msg) msg.innerText = j.success ? 'Poll created' : (j.error || 'Failed');
    });
}
