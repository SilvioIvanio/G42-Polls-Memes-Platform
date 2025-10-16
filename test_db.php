<?php
// test_db.php - quick PDO connection test for the Campus Pulse project
// Usage: php test_db.php

require_once __DIR__ . '/API/config.php';

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NUM]
    );

    echo "OK: connected to '" . DB_NAME . "' on " . DB_HOST . "\n";

    // list tables as a sanity check
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "Tables found: " . count($tables) . "\n";
    foreach ($tables as $row) {
        echo " - " . $row[0] . "\n";
    }

} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}

exit(0);
