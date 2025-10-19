<?php
require_once __DIR__ . '/config.php';

try {
    // The DB_DSN, DB_USER, and DB_PASS constants are now defined in config.php 
    // for the correct environment (local or production).
    $pdo = new PDO(
        DB_DSN,
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (PDOException $e) {
    http_response_code(500);
    // For debugging during deployment, it's helpful to see the actual error.
    // In a real production environment, you would log this error to a file instead of showing it to the user.
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>