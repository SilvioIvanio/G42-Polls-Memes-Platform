import { register } from './api.js';

const form = document.getElementById('registerForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const username = fd.get('username');
        const email = fd.get('email');
        const password = fd.get('password');
        const j = await register(username, email, password);
        if (j && j.success) {
            window.location = '../index.html';
        } else {
            const msg = document.getElementById('msg');
            if (msg) msg.innerText = j.error || 'Registration failed';
        }
    });
} else {
    console.warn('registerForm not found on page');
}