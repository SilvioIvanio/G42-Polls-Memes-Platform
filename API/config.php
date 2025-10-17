<?php
// Database Configuration
// Default MySQL port 3306 as per standard setup
define('DB_HOST', '127.0.0.1:3306');
define('DB_NAME', 'campus_pulse');
define('DB_USER', 'root');
define('DB_PASS', ''); // Sets the MySQL root password if any

// Path where uploaded memes will be stored (relative to project root)
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
?>