import { uploadMeme } from './api.js';
import { validateMeme } from './validation.js';

// Apply saved theme on page load
function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Initialize theme
applyTheme();

console.log('meme.js loaded!');

// File upload feedback
const fileInput = document.getElementById('memeFileInput');
const fileLabel = document.getElementById('fileLabel');
const fileText = document.getElementById('fileText');
const fileSelected = document.getElementById('fileSelected');
const fileName = document.getElementById('fileName');

if (fileInput) {
    fileInput.addEventListener('change', function(e) {
        if (this.files && this.files.length > 0) {
            const file = this.files[0];
            // Show selected file indicator
            fileLabel.style.display = 'none';
            fileSelected.style.display = 'flex';
            fileName.textContent = file.name;
        }
    });
}

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
        
        // Reset file input display on success
        if (j.success) {
            memeForm.reset();
            if (fileLabel && fileSelected) {
                fileLabel.style.display = 'flex';
                fileSelected.style.display = 'none';
            }
        }
    });
}
