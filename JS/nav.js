import { logout } from './api.js';

export function attachLogout(selector = 'a#logoutLink') {
  document.querySelectorAll(selector).forEach(a => {
    a.addEventListener('click', async (e) => {
      e.preventDefault();
      try { await logout(); } catch (err) { /* ignore */ }
      location.href = 'index.html';
    });
  });
}

export function highlightNav() {
  try {
    const parts = location.pathname.split('/');
    const page = parts.pop() || parts.pop();
    document.querySelectorAll('.nav-actions a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const hrefPage = href.split('/').pop();
      if (hrefPage === page) a.classList.add('active');
    });
  } catch (e) { /* ignore */ }
}
