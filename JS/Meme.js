import { uploadMeme } from './api.js';
import { validateMeme } from './validation.js';

console.log('meme.js loaded!');

const memeForm = document.getElementById('memeForm');
console.log('memeForm element:', memeForm);

if (memeForm) {
    memeForm.addEventListener('submit', async (e) => {
        console.log('Meme form submitted!');
        e.preventDefault();
        const fd = new FormData(memeForm);
        const msg = document.getElementById('msg');
        const v = validateMeme(fd);
        console.log('Validation result:', v);
        if (!v.valid) { 
            if (msg) msg.innerText = v.error; 
            return; 
        }
        console.log('Calling uploadMeme API...');
        const j = await uploadMeme(fd);
        console.log('Upload response:', j);
        if (msg) msg.innerText = j.success ? 'Meme uploaded' : (j.error || 'Failed');
    });
}
