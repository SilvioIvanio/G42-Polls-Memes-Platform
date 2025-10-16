import { register } from './api.js';

const form = document.getElementById('registerForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const username = fd.get('username');
        const email = fd.get('email');
        const password = fd.get('password');
        const confirm = fd.get('confirm');
        
        // Check if passwords match
        if (password !== confirm) {
            const msg = document.getElementById('msg');
            if (msg) msg.innerText = 'Passwords do not match';
            return;
        }
        
        const j = await register(username, email, password);
        console.log('Registration response:', j); // Debug log
        
        if (j && j.success) {
            // Successful registration - redirect to homepage
            window.location.href = 'homepage.html';
        } else {
            const msg = document.getElementById('msg');
            if (msg) msg.innerText = j.error || 'Registration failed';
        }
    });
} else {
    console.warn('registerForm not found on page');
}