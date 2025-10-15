# **Strategy & Key Focus Areas**

Our plan is solid. Now the key is execution. Below are the most critical areas we should focus on for each upcoming checkpoint so we turn a strong plan into an excellent final product.

### For Checkpoint 1 (Step 3): Wireframes / HTML Skeleton

- We’re well prepared. Let’s translate our proposal wireframes into semantic HTML files.
- We’ll focus on structure first and defer CSS. We should create `index.php`, `login.php`, `create.php`, and similar files with appropriate `<h1>`, `<form>`, `<input>`, and related tags to establish our skeleton.

### For Checkpoint 2 (Step 6): JavaScript Interactivity

- This is our most critical front‑end challenge. We need instant poll results.
- Our core task is to use the JavaScript `fetch()` API.
    1. When we click a Vote button, we prevent the default form submission with `preventDefault()`.
    2. We send the poll ID and selected option via `fetch()` to a PHP endpoint asynchronously.
    3. The PHP script processes the vote and returns updated counts as JSON.
    4. We update the result bars dynamically from the JSON response without a full reload.
- Recommendation: we start early. We can implement a temporary PHP endpoint that returns mock JSON (for example, `{"optionA": 15, "optionB": 25}`) to perfect our `fetch()` flow and UI updates independently of the backend.

### For Checkpoint 3 (Step 8): PHP/DB Integration

- This is our most critical back‑end challenge. Two areas require particular attention to meet the security criteria.
    1. Secure database queries: we use PHP PDO or MySQLi with prepared statements when saving votes or user data to prevent SQL injection. Direct string‑interpolated queries (for example, `mysqli_query($conn, "INSERT INTO votes...")`) are insecure and we should avoid them.
    2. Secure file uploads (memes module):
        - We restrict allowed MIME types (for example, `image/jpeg`, `image/png`).
        - We enforce file size limits to prevent oversized uploads.
        - We move uploaded files to a dedicated `uploads/` directory using `move_uploaded_file()`.
        - We persist files with new, unique filenames to reduce security risks.

### Final Assessment

We’re well positioned. Our proposal functions as a strategic document aligned with requirements and success criteria. By prioritizing the key technical challenge, especially asynchronous JavaScript for polls and secure PHP practices on the backend, we’re on track to deliver a high‑quality result that should comfortably score in the Excellent range.