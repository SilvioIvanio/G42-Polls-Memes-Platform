# API Documentation

This document provides details on the backend API endpoints for the Campus Pulse application.

---

## Authentication

### `POST /API/register.php`

- **Description:** Registers a new user account.
- **Authentication:** Not required.
- **Request Body:** `application/json`
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "user_id": "integer"
  }
  ```
- **Error Response (400 Bad Request):** If fields are missing or the user already exists.
  ```json
  {
    "error": "User exists or registration failed"
  }
  ```

### `POST /API/login.php`

- **Description:** Logs in a user and creates a server-side session.
- **Authentication:** Not required.
- **Request Body:** `application/json`
  ```json
  {
    "identifier": "string", // Can be username or email
    "password": "string"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "user_id": "integer",
    "is_admin": "boolean"
  }
  ```
- **Error Response (401 Unauthorized):** For invalid credentials.
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### `POST /API/logout.php`

- **Description:** Destroys the current user session.
- **Authentication:** Required.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

---

## User Profile

### `GET /API/get_profile.php`

- **Description:** Fetches the profile information for the currently logged-in user.
- **Authentication:** Required.
- **Request Body:** None.
- **Success Response (200 OK):**
  ```json
  {
    "id": "integer",
    "username": "string",
    "email": "string",
    "created_at": "string (timestamp)"
  }
  ```

### `POST /API/update_profile.php`

- **Description:** Updates the username, email, and optionally the password for the logged-in user.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string" // Optional
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Profile updated successfully"
  }
  ```

---

## Polls

### `GET /API/fetch_polls.php`

- **Description:** Fetches a list of the 50 most recent polls with their options and vote counts.
- **Authentication:** Not required.
- **Success Response (200 OK):** An array of poll objects.
  ```json
  [
    {
      "id": "integer",
      "user_id": "integer",
      "question": "string",
      "author": "string",
      "created_at": "string (timestamp)",
      "total_votes": "integer",
      "options": [
        {
          "id": "integer",
          "option_text": "string",
          "votes": "integer",
          "user_voted": "boolean"
        }
      ]
    }
  ]
  ```

### `POST /API/create_poll.php`

- **Description:** Creates a new poll.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "question": "string",
    "options": ["string", "string", ...]
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "poll_id": "integer"
  }
  ```

### `POST /API/vote.php`

- **Description:** Casts a vote on a poll option.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "poll_id": "integer",
    "option_id": "integer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

### `POST /API/unvote.php`

- **Description:** Removes a user's vote from a poll option.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "poll_id": "integer",
    "option_id": "integer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

### `POST /API/delete_poll.php`

- **Description:** Deletes a poll owned by the logged-in user.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "poll_id": "integer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```

---

## Memes

### `GET /API/fetch_memes.php`

- **Description:** Fetches a list of the 50 most recent memes.
- **Authentication:** Not required.
- **Success Response (200 OK):** An array of meme objects.
  ```json
  [
    {
      "id": "integer",
      "user_id": "integer",
      "filename": "string",
      "caption": "string",
      "username": "string",
      "created_at": "string (timestamp)"
    }
  ]
  ```

### `POST /API/upload_meme.php`

- **Description:** Uploads a new meme.
- **Authentication:** Required.
- **Request Body:** `multipart/form-data`
  - `meme`: The image file (PNG, JPG, GIF).
  - `caption`: (Optional) The text caption for the meme.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "filename": "string"
  }
  ```

### `POST /API/update_meme.php`

- **Description:** Updates the caption of a meme owned by the logged-in user.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "meme_id": "integer",
    "caption": "string"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "caption": "string"
  }
  ```

### `POST /API/delete_meme.php`

- **Description:** Deletes a meme owned by the logged-in user and its associated image file.
- **Authentication:** Required.
- **Request Body:** `application/json`
  ```json
  {
    "meme_id": "integer"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true
  }
  ```
