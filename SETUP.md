# Campus Pulse - Setup Guide for Group Members

This guide will help you set up and run the Campus Pulse web application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **XAMPP** (Apache + MySQL + PHP)
   - Download from: https://www.apachefriends.org/
   - Install with default settings (recommended path: `C:\xampp`)

2. **Git** (to clone the repository)
   - Download from: https://git-scm.com/downloads

---

## Installation Steps

### Step 1: Clone the Repository

Open PowerShell or Command Prompt and run:

```powershell
git clone https://github.com/SilvioIvanio/G42-Polls-Memes-Platform.git
cd G42-Polls-Memes-Platform
```

### Step 2: Copy Files to XAMPP

Copy all project files to your XAMPP htdocs folder:

```powershell
# In PowerShell
Copy-Item -Path ".\*" -Destination "C:\xampp\htdocs\" -Recurse -Force
```

Or manually:
- Copy all files from the cloned repository
- Paste them into `C:\xampp\htdocs\`

### Step 3: Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Click **Start** for **Apache**
3. Click **Start** for **MySQL**

**⚠️ Note:** The app automatically detects whether MySQL is running on port 3306 (default) or 3307. You don't need to configure the port manually!

### Step 4: Create Database

**Option A: Using phpMyAdmin (Recommended)**

1. Open your browser and go to: `http://localhost/phpmyadmin`
2. Click on **"New"** in the left sidebar
3. Create a database named: `campus_pulse`
4. Click on the `campus_pulse` database
5. Go to the **"Import"** tab
6. Click **"Choose File"** and select the `db.sql` file from the project
7. Scroll down and click **"Import"**

**Option B: Using MySQL Command Line**

```bash
# Navigate to MySQL bin directory
cd C:\xampp\mysql\bin

# Login to MySQL
mysql.exe -u root -p

# Create database and import schema
CREATE DATABASE campus_pulse;
USE campus_pulse;
SOURCE C:/xampp/htdocs/db.sql;
EXIT;
```

### Step 5: Configure Database (Optional)

The app automatically detects your MySQL port, so you usually don't need to change anything!

**Only edit if you have a non-standard setup:**

Open `C:\xampp\htdocs\API\config.php` and update if needed:

```php
<?php
define('DB_NAME', 'campus_pulse');
define('DB_USER', 'root');           // Your MySQL username (usually 'root')
define('DB_PASS', '');               // Your MySQL password (usually empty for XAMPP)
```

### Step 6: Create Uploads Directory

The application needs a folder to store uploaded memes:

```powershell
# In PowerShell
New-Item -ItemType Directory -Path "C:\xampp\htdocs\uploads" -Force
```

Or manually create a folder named `uploads` in `C:\xampp\htdocs\`

### Step 7: Access the Application

**Option A: Using XAMPP Apache (Recommended)**

1. Ensure Apache is running in XAMPP
2. Open your web browser
3. Go to: `http://localhost/HTML/index.html`

**Option B: Using PHP Built-in Server**

```powershell
# Navigate to project directory
cd C:\xampp\htdocs

# Start PHP server (keep XAMPP MySQL running)
php -S 127.0.0.1:8000

# Open browser to:
# http://127.0.0.1:8000/HTML/index.html
```

### Step 8: Test the Application

**Test database connection:**
- Visit: `http://localhost/API/test_db.php` (or `http://127.0.0.1:8000/API/test_db.php`)
- You should see "Database connection successful!"

**Create an account:**
1. Click **"Register"**
2. Create a new account
3. Login with your credentials
4. Test the features:
   - Create a poll
   - Upload a meme
   - Vote on polls
   - Toggle dark/light mode in your profile

---

## Common Issues & Solutions

### Issue: Apache won't start
**Solution:** Port 80 might be in use by another application (like Skype or IIS)
- Close the conflicting application, OR
- Change Apache port in XAMPP config, OR
- Use PHP built-in server (see Step 7, Option B)

### Issue: MySQL won't start
**Solution:** Port 3306 is already in use
- Check Task Manager for other MySQL processes and stop them
- Restart XAMPP
- The app will automatically try port 3307 if 3306 is unavailable

### Issue: "Database connection failed"
**Solution:**
- Verify MySQL is running in XAMPP Control Panel
- Ensure database `campus_pulse` exists (check in phpMyAdmin)
- If you have a MySQL password, update it in `API/config.php`

### Issue: File paths are broken (404 errors)
**Solution:**
- Ensure all files are in `C:\xampp\htdocs\`, NOT in a subfolder like `htdocs\G42-Polls-Memes-Platform\`
- If using Apache, access via: `http://localhost/HTML/index.html`
- If using PHP server, access via: `http://127.0.0.1:8000/HTML/index.html`

### Issue: Meme upload fails
**Solution:**
- Ensure `uploads` folder exists in `C:\xampp\htdocs\`
- Check folder has write permissions
- Verify the folder is not read-only (right-click → Properties)

### Issue: Dark mode doesn't persist
**Solution:**
- Clear browser cache (Ctrl + Shift + Delete)
- Ensure localStorage is enabled in browser settings
- Try a different browser to test

---

## Project Structure

```
htdocs/
├── API/                    # Backend PHP files
│   ├── config.php         # Database configuration (auto-detects port)
│   ├── register.php       # User registration
│   ├── login.php          # User authentication
│   ├── create_poll.php    # Poll creation
│   ├── vote.php           # Voting logic
│   ├── unvote.php         # Vote removal
│   ├── upload_meme.php    # Meme upload
│   └── ...
├── HTML/                  # HTML pages
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   └── ...
├── JS/                    # JavaScript modules
│   ├── api.js            # API wrapper functions
│   ├── renderers.js      # Poll/meme rendering
│   ├── app.module.js     # Main app logic
│   └── ...
├── styles/               # CSS files
│   ├── variables.css     # CSS custom properties (theming)
│   ├── components.css    # Component styles
│   ├── layout.css        # Layout styles
│   └── ...
├── uploads/              # Uploaded meme images (CREATE THIS)
├── db.sql               # Database schema
├── homepage.html        # Homepage (authenticated users)
├── polls.html           # Polls page
├── memes.html           # Memes page
├── create.html          # Create content page
└── profile.html         # User profile page
```

---

## Features

✅ User registration and authentication  
✅ Create polls (single or multiple choice)  
✅ Vote and unvote on polls  
✅ Upload memes with captions  
✅ User profiles with edit capability  
✅ Dark/Light mode toggle  
✅ Responsive design  
✅ Automatic MySQL port detection  

---

## Access Points

After setup, you can access the application at:

**Using Apache (XAMPP):**
- **Landing Page:** `http://localhost/HTML/index.html`
- **Homepage:** `http://localhost/homepage.html`
- **Login:** `http://localhost/HTML/login.html`
- **Register:** `http://localhost/HTML/register.html`

**Using PHP Built-in Server:**
- **Landing Page:** `http://127.0.0.1:8000/HTML/index.html`
- **Homepage:** `http://127.0.0.1:8000/homepage.html`
- **Login:** `http://127.0.0.1:8000/HTML/login.html`
- **Register:** `http://127.0.0.1:8000/HTML/register.html`

---

## Need Help?

If you encounter any issues not covered in this guide:
1. Check that XAMPP services (Apache and MySQL) are running
2. Review browser console for JavaScript errors (Press F12)
3. Check Apache/PHP error logs in `C:\xampp\apache\logs\`
4. Verify database exists in phpMyAdmin
5. Contact the team for assistance

---

## Quick Reference Commands

**Copy files to htdocs:**
```powershell
Copy-Item -Path ".\*" -Destination "C:\xampp\htdocs\" -Recurse -Force
```

**Create uploads folder:**
```powershell
New-Item -ItemType Directory -Path "C:\xampp\htdocs\uploads" -Force
```

**Start PHP built-in server:**
```powershell
cd C:\xampp\htdocs
php -S 127.0.0.1:8000
```

**Test database connection:**
```
http://localhost/API/test_db.php
```

---

**Good luck! 🚀**
