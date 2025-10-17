# Quick Fix: Vote Buttons Not Working

## If you're running WITHOUT XAMPP:

### Step 1: Verify You're Running the Server

```powershell
# Navigate to project folder
cd G42-Polls-Memes-Platform

# Start PHP server (if not already running)
php -S 127.0.0.1:8000
```

**Important:** Keep this terminal window open!

### Step 2: Access the Right URL

Make sure you're using:
```
http://127.0.0.1:8000/HTML/index.html
```

NOT:
- ❌ `http://localhost/HTML/index.html` (this requires XAMPP)
- ❌ Opening files directly from folder (file:/// URLs won't work)

### Step 3: Ensure You're Logged In

1. Go to: `http://127.0.0.1:8000/HTML/login.html`
2. Login with your account
3. Navigate to polls page
4. Try voting again

### Step 4: Check MySQL is Running

```powershell
# Test MySQL connection
mysql -u root -p
# Enter your MySQL password

# If connected, you should see:
mysql>

# Type: EXIT; to quit
```

If MySQL is not running, start it.

---

## If you're running WITH XAMPP:

### Step 1: Verify Apache and MySQL are Started

1. Open **XAMPP Control Panel**
2. Check that **Apache** shows "Running" (green)
3. Check that **MySQL** shows "Running" (green)
4. If not, click **Start** on each

### Step 2: Access the Right URL

Make sure you're using:
```
http://localhost/HTML/index.html
```

NOT:
- ❌ `http://127.0.0.1:8000/...` (this is for standalone PHP server)
- ❌ Opening files directly

### Step 3: Ensure Files Are in htdocs

Check that files exist in: `C:\xampp\htdocs\`

If not, copy them:
```powershell
cd G42-Polls-Memes-Platform
Copy-Item -Path ".\*" -Destination "C:\xampp\htdocs\" -Recurse -Force
```

### Step 4: Ensure You're Logged In

1. Go to: `http://localhost/HTML/login.html`
2. Login with your account
3. Navigate to polls page
4. Try voting again

---

## General Fixes (Both Setups)

### Fix 1: Clear Browser Cache

1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page (Ctrl + F5)

### Fix 2: Check Browser Console

1. Press **F12**
2. Go to **Console** tab
3. Look for red errors
4. Share screenshot with team if you see errors

### Fix 3: Logout and Login Again

1. Click **Logout**
2. Login again
3. Try voting

---

## Quick Test

Visit this URL to test database connection:

**XAMPP:** `http://localhost/test_connection.php`  
**Standalone:** `http://127.0.0.1:8000/test_connection.php`

Should show:
- ✓ Database connection successful
- ✓ Detected MySQL Host
- ✓ List of tables

If this works, your setup is correct!

---

## Still Not Working?

Share this info with the team:

1. **Your setup:** XAMPP or Standalone?
2. **URL you're using:** (copy from browser)
3. **Browser console errors:** (F12 → Console tab screenshot)
4. **Are you logged in?** (username shows in nav bar?)
5. **Database test result:** (from test_connection.php)

---

**Most common issue:** Not logged in! Make sure you see your username in the navigation bar.
