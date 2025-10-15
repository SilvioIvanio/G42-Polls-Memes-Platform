import { uploadMeme } from './api.js';
import { validateMeme } from './validation.js';

const memeForm = document.getElementById('memeForm');
if (memeForm) {
    memeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(memeForm);
        const msg = document.getElementById('msg');
        const v = validateMeme(fd);
        if (!v.valid) { if (msg) msg.innerText = v.error; return; }
        const j = await uploadMeme(fd);
        if (msg) msg.innerText = j.success ? 'Meme uploaded' : (j.error || 'Failed');
    });
}
