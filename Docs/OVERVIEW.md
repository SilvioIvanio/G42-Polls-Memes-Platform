# Project Overview

### **1. Project Summary & Core Concept**

Our "Campus Polls & Memes Platform" is a social platform designed for our university community. As outlined in the **Project Descriptions (Page 1)**, our primary purpose is to let us engage with two main types of content:

- **Polls:** Simple campus‑related questions (for example, “best lecturer?”) where we can vote and see results.
- **Memes:** We can upload humorous images or content relevant to campus life.

The platform must be interactive and dynamic, combining a responsive front end with a back end that stores our data.

### **2. Key Technical Components & Requirements**

The project description specifies a clear technology stack, with each part playing a distinct role:

- **HTML:** We use HTML for the fundamental structure of the platform. We’ll build the layout for displaying polls, the meme feed, and the forms for creating polls and uploading memes.
- **JavaScript (JS):** This is the core of our user‑facing interactivity. A key requirement is **"JS for instant results."** This means our page should not require a full refresh after we vote. We will use the **Fetch API or AJAX** to:
    1. Send our vote to the server in the background.
    2. Receive updated vote counts from the server.
    3. Update poll results (numbers or a graph) on the screen dynamically.
- **PHP:** This is our server‑side language for handling backend logic. Its responsibilities include:
    - **Storing votes:** Receiving our votes from the JavaScript front end, validating them, and saving them into a database (likely MySQL).
    - **Storing files:** Handling file uploads with `$_FILES`, validating type and size, and saving files securely to a server directory.

### **3. Path to an "Excellent" Grade (Analysis Based on the Rubric)**

To score in the **Excellent (85–100%)** range, we must excel in the criteria detailed in the **Assessment Rubric (Pages 2–3)**. Here’s how those criteria apply to our project:

- **Functionality & Requirements (25%):**
    - **Good:** The basic features work. We can see polls, vote, see memes, and upload a meme.
    - **Excellent:** All features are complete, stable, and exceed requirements:
        - Our voting system is stable and records votes accurately.
        - Meme uploads work reliably.
        - "Instant results" with JavaScript work smoothly.
        - **Exceeding requirements:** Add thoughtful extras such as comments on memes and polls, basic user accounts to track who voted or uploaded, or multiple poll types.
- **Code Quality & Structure (15%):**
    - **Excellent:** Our code is clean, modular, well‑commented, and secure.
        - **Modular:** Break JavaScript into logical functions (for example, `handleVote()`, `displayPollResults()`). Separate PHP database connection logic from vote and upload handlers.
        - **Secure:** Use prepared statements (PDO or MySQLi) to prevent SQL injection. For file uploads, validate file types and sizes and consider safe file renaming.
- **User Interface & Design (10%):**
    - **Excellent:** The UI is professional, responsive, accessible, and polished.
        - **Professional & polished:** Polls look clear with well‑designed results (for example, animated bars). The meme feed is clean and scannable, perhaps using cards.
        - **Responsive:** The platform works well on mobile and desktop using Flexbox or Grid.
- **Use of Technology (10%):**
    - **Excellent:** We demonstrate advanced and creative use of APIs and database integration. A strong signal is a robust Fetch API implementation for asynchronous PHP communication that powers instant results.
- **Innovation & Relevance (10%):**
    - **Excellent:** Our content is creative, locally relevant, and unique. We prioritize polls and memes that resonate with our specific student community over generic content.

### **4. Project Timeline & Workflow**

We follow the **Project Timeline (Page 3)**. Here’s how our deliverables map to the timeline:

- **Week 8 (Checkpoint 1): Wireframes / HTML Skeleton.** We build the basic HTML structure for poll display, the meme feed, and upload forms. No styling is required, but the structure should be in place.
- **Week 11 (Checkpoint 2): JavaScript Interactivity.** We demonstrate **instant results**. Our JavaScript can simulate and process voting and dynamically update the UI.
- **Week 13 (Checkpoint 3): DB Integration & Advanced Features.** Our PHP backend is functional. We can save votes and meme uploads to the server and retrieve them for display.

Per the **Project Tools & Workflow (Page 3)**, we are required to use:

- **GitHub:** For version control with a clear, meaningful commit history.
- **Jira/Trello:** To plan our work with tasks such as "Create poll voting interface," "Build PHP file upload script," and "Design responsive meme card layout."