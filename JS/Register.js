const form = document.getElementById('registerForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        // send as form-encoded data so PHP backend can handle it normally
        const res = await fetch('../API/register.php', { method: 'POST', body: fd });
        let j = {};
        try { j = await res.json(); } catch (err) { console.error('Invalid JSON response', err); }
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