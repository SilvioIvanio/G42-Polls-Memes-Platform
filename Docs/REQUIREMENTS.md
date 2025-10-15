# **Project Requirements Document: Campus Pulse**

---

**Version:** 1.0
**Group:** 42 (Silvio Ivanio, Andris Kaishungu, Hernane Prata)
**Project:** Campus Pulse: Polls & Memes Platform

---

### **1. Introduction**

**1.1. Purpose**
This document provides a detailed specification of the requirements for the "Campus Pulse" web application. It serves as the primary guide for design, development, and testing, ensuring all stakeholders have a shared understanding of the final product's functionality, features, and constraints.

**1.2. Project Scope**
Campus Pulse will be a centralized, campus-specific social platform for university students and staff. It will allow authenticated users to create and interact with polls and memes, fostering community engagement.

- **In Scope:** User registration/login, poll creation, voting with instant results, meme uploads, a basic admin panel for moderation, and a responsive design.
- **Out of Scope:** Advanced social features like a direct messaging system, commenting, liking systems, advanced account management (2FA), and large-scale cloud infrastructure.

**1.3. Target Audience**
The primary users are students and staff of the university (e.g., NUST). The application will cater to their desire for campus-specific social interaction and humor.

---

### **2. Functional Requirements**

The system's functionalities are broken down into the following modules.

**2.1. Authentication Module**

- **FR-AUTH-01: User Registration**
    - The system shall provide a registration form with fields for Username, Email, and Password.
    - The system must validate that the chosen username and email are unique in the database.
    - Passwords must be securely hashed before being stored in the database.
    - Upon successful registration, the user will be redirected to the login page.
- **FR-AUTH-02: User Login**
    - The system shall provide a login form with fields for Email and Password.
    - The system will validate user credentials against the database.
    - On successful login, a server-side session will be initiated for the user, and they will be redirected to the home page.
    - On failure, an appropriate error message will be displayed.
- **FR-AUTH-03: User Logout**
    - The system shall provide a logout mechanism that destroys the user's session and redirects them to the login page.
- **FR-AUTH-04: Access Control**
    - Only authenticated (logged-in) users shall be able to create polls or upload memes.
    - Unauthenticated visitors (guests) will have read-only access to view existing polls and memes.

**2.2. Polls Module**

- **FR-POLL-01: Poll Creation**
    - Authenticated users shall be able to access a "Create" page to generate a new poll.
    - The creation form will include a text field for the poll question and multiple text fields for the poll options.
    - Upon submission, the poll data (question and options) will be stored in the database.
- **FR-POLL-02: Poll Viewing**
    - All polls shall be displayed on the home page in a feed, showing the poll question and its voting options.
- **FR-POLL-03: Voting & Instant Results**
    - Users shall be able to vote by selecting one of the available options for a poll.
    - The vote submission must be handled asynchronously using JavaScript (e.g., Fetch API).
    - The page **must not** perform a full reload after a vote is cast. The UI must update instantly to display the new results.
    - The vote count must be updated in the database.
- **FR-POLL-04: Poll Deletion**
    - Authenticated users shall have the ability to delete polls they have created.

**2.3. Memes Module**

- **FR-MEME-01: Meme Upload**
    - Authenticated users shall be able to upload a meme via the "Create" page.
    - The upload form will include a file input for the image (captioned image) and a text field for a caption.
- **FR-MEME-02: Meme Storage & Display**
    - Uploaded image files shall be stored on the server's file system.
    - The path to the image and its associated caption will be stored in the database.
    - Memes shall be displayed in the main feed on the home page.
- **FR-MEME-03: Meme Deletion**
    - Authenticated users shall have the ability to delete memes they have uploaded.

**2.4. Administration Module**

- **FR-ADMIN-01: Admin Access**
    - Users with a designated "admin" role will be redirected to an Admin Panel upon login.
- **FR-ADMIN-02: Content Moderation**
    - The Admin Panel will display a list of all user-submitted content (polls and memes).
    - Admins shall have the ability to approve or remove any content from the platform.

---

### **3. Non-Functional Requirements**

- **NFR-1: Performance**
    - The main feed shall load in under 3 seconds on a standard internet connection.
    - The "instant results" from poll voting should update the UI in under 500 milliseconds.
- **NFR-2: Security**
    - All user passwords must be hashed using a modern, secure algorithm (e.g., PHP's `password_hash()`).
    - All database queries involving user input must use **prepared statements (via PDO or MySQLi)** to prevent SQL injection.
    - All user-submitted text content (e.g., captions, poll questions) must be sanitized before being displayed to prevent Cross-Site Scripting (XSS) attacks.
    - The meme file upload functionality must validate file types (e.g., only accept `image/jpeg`, `image/png`) and file sizes to prevent malicious uploads.
- **NFR-3: Usability & UI**
    - The user interface will be clean, intuitive, and easy to navigate.
    - The application will provide clear visual feedback for user actions, such as success or error messages after a form submission.
- **NFR-4: Responsiveness**
    - The application's layout must be fully responsive and function correctly on desktop, tablet, and mobile screen sizes. On mobile devices, multi-column layouts will collapse into a single-column view for readability.
- **NFR-5: Compatibility**
    - The platform must be compatible with the latest versions of modern web browsers, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.

---

### **4. System Architecture & Technology Stack**

- **Frontend:** HTML5, CSS3, JavaScript (for DOM manipulation and asynchronous requests).
- **Backend:** PHP (for server-side logic and database communication).
- **Database:** MySQL (for storing user, poll, and meme data).
- **Authentication:** Server-side PHP sessions, with secure password hashing.
- **Version Control:** Git & GitHub.
- **Project Management:** Trello or Jira.
- **Design:** Figma.
- **Hosting:** Local Server (e.g., WAMP/XAMPP) for development, with a plan for deployment to a public server (e.g., Vercel) if feasible.