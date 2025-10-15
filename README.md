
# G42-Polls-Memes-Platform

Overview
--------
G42-Polls-Memes-Platform is a lightweight web application that combines polls and image memes in a social-feed style interface. The system comprises a PHP backend API, static HTML pages, modular CSS, and ES module-based client-side code.

High-level features
-------------------
- Browse recent polls with per-option vote counts.
- Browse recently uploaded memes (images and captions).
- Create polls and upload memes via authenticated pages.
- User authentication with login (supports username or email) and logout (server-side session termination).
- A homepage with featured content and preview cards.

Project structure
-----------------
- `HTML/` — static pages (index, homepage, polls, memes, login, register, create).
- `JS/` — ES modules and page scripts (API wrappers, utilities, renderers, nav helpers, validation, and module entrypoint).
- `styles/` — modular CSS files; `styles/styles.css` imports the modules.
- `API/` — PHP endpoints (fetch_polls.php, fetch_memes.php, login.php, register.php, logout.php, create_poll.php, upload_meme.php).
- `uploads/` — uploaded meme images (served from `/uploads/`).

Client-side modules
------------------
- `JS/api.js` — network wrappers (fetch lists, login/register, create/upload, vote, logout).
- `JS/utils.js` — helpers (e.g., `escapeHtml`).
- `JS/renderers.js` — DOM rendering helpers for polls and memes.
- `JS/nav.js` — navigation helpers (logout handling, nav highlighting).
- `JS/validation.js` — client-side form validators for poll and meme submissions.
- `JS/app.module.js` — module entrypoint that initializes page-specific behavior and composes the modules.

Server API behavior
-------------------
- `fetch_polls.php` — returns polls with options and computed vote counts.
- `fetch_memes.php` — returns recent memes with filename, caption, and uploader username.
- `login.php` — accepts an identifier (username or email) and password; returns session info on success.
- `register.php` — registers a new user and returns session info on success.
- `logout.php` — destroys the server session and returns a success response.

Running the project locally
--------------------------
1. From the project root, start a PHP development server (or use Live Server in VS Code):

```powershell
php -S 127.0.0.1:8000
```

2. Open the application in a browser:

- http://127.0.0.1:8000/HTML/index.html — overview (polls + memes)
- http://127.0.0.1:8000/HTML/homepage.html — homepage with featured content

Recommendations
---------------
- Add a dedicated endpoint for server-driven featured selection if curated content is needed.
- Enforce server-side protection for creation/upload endpoints so only authenticated users may create polls or upload memes.
- Consider adding automated tests (unit/integration) and a linting pipeline (ESLint + Prettier) for consistent code quality.

Contributors
------------
This repository is maintained by multiple contributors. Add a `CONTRIBUTORS.md` or `AUTHORS` file to document team members.

JS modularization
-----------------
The frontend codebase has been refactored into focused ES modules to improve maintainability and allow easier testing. Key modules are listed above under "Client-side modules."  

Converted page scripts
----------------------
- Page-specific scripts (login/register, poll creation, meme upload) were converted to ES modules and now consume `JS/api.js` and shared helpers.

