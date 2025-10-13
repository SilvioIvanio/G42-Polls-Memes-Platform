<?php
require_once 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$username || !$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $hash]);
    $_SESSION['user_id'] = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id']]);
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(['error' => 'User exists or registration failed']);
}
?>