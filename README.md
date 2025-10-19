
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

## Getting Started: Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

- PHP 8.0 or higher
- MySQL 5.7 or higher
- A web browser

### 1. Database Setup

1.  **Start your MySQL server.**

2.  **Create the database.** Using a tool like TablePlus, phpMyAdmin, or the MySQL command line, create a new database named `campus_pulse`.
    ```sql
    CREATE DATABASE campus_pulse;
    ```

3.  **Import the database schema.** Import the `db.sql` file located in the project root into your new `campus_pulse` database. This will create all the necessary tables.
    ```bash
    # Example using the command line from the project root:
    mysql -u your_username -p campus_pulse < db.sql
    ```

### 2. Application Configuration

1.  Navigate to the `API/` directory.

2.  Open the `config.php` file in a text editor.

3.  Update the database credentials to match your local MySQL setup:
    ```php
    define('DB_HOST', '127.0.0.1:3306'); // Ensure the host and port are correct
    define('DB_NAME', 'campus_pulse');
    define('DB_USER', 'root');     // Your MySQL username
    define('DB_PASS', '');         // Your MySQL password
    ```

### 3. Running the Application

1.  **Start the PHP web server.** From the **project root directory**, run the following command in your terminal:
    ```bash
    php -S 127.0.0.1:8000
    ```
    This will start a local web server on port 8000.

2.  **Access the application.** Open your web browser and navigate to the login page to start:
    - **http://127.0.0.1:8000/HTML/login.html**


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

