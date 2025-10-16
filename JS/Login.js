import { login } from './api.js';

console.log('Login.js loaded!');

const loginForm = document.getElementById('loginForm');
console.log('loginForm element:', loginForm);

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        console.log('Form submitted!');
        e.preventDefault();
        const fd = new FormData(loginForm);
        const identifier = fd.get('identifier');
        const password = fd.get('password');
        console.log('About to call login API...');
        const j = await login(identifier, password);
        console.log('Login response:', j);
        if (j && j.success) {
            console.log('Redirecting to homepage.html');
            window.location.href = 'homepage.html';
        } else {
            const msg = document.getElementById('msg');
            if (msg) msg.innerText = j.error || 'Login failed';
        }
    });
} else {
    console.warn('loginForm not found on page');
}