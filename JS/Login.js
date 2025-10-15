import { login } from './api.js';

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(loginForm);
        const identifier = fd.get('identifier');
        const password = fd.get('password');
        const j = await login(identifier, password);
        if (j && j.success) {
            window.location = '../index.html';
        } else {
            const msg = document.getElementById('msg');
            if (msg) msg.innerText = j.error || 'Login failed';
        }
    });
} else {
    console.warn('loginForm not found on page');
}