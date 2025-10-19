<?php

// This file automatically configures the database connection based on the environment.

// Check for the DATABASE_URL environment variable provided by hosting services like Render.
$databaseUrl = getenv('DATABASE_URL');

if ($databaseUrl) {
    // --- Production Environment (e.g., Render) ---
    $dbConfig = parse_url($databaseUrl);

    define('DB_HOST', $dbConfig['host']);
    define('DB_NAME', ltrim($dbConfig['path'], '/'));
    define('DB_USER', $dbConfig['user']);
    define('DB_PASS', $dbConfig['pass']);
    // Render uses PostgreSQL, so the DSN (Data Source Name) prefix is different.
    define('DB_DSN', "pgsql:host=" . DB_HOST . ";dbname=" . DB_NAME);

} else {
    // --- Local Development Environment ---
    // Default MySQL port 3306 as per standard setup
    define('DB_HOST', '127.0.0.1:3306');
    define('DB_NAME', 'campus_pulse');
    define('DB_USER', 'root');
    define('DB_PASS', ''); // Your local MySQL password
    // DSN for local MySQL connection
    define('DB_DSN', "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4");
}

// Path where uploaded memes will be stored (relative to project root)
// This path needs to be correct for the server's file system.
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

?>