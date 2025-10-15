import { createPoll } from './api.js';
import { validatePoll } from './validation.js';

const form = document.getElementById('pollForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const question = fd.get('question');
        const options = (fd.get('options') || '').split(',').map(s => s.trim()).filter(Boolean);
        const v = validatePoll(question, options);
        const msg = document.getElementById('msg');
        if (!v.valid) { if (msg) msg.innerText = v.error; return; }
        const j = await createPoll(question, options);
        if (msg) msg.innerText = j.success ? 'Poll created' : (j.error || 'Failed');
    });
}
