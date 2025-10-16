<?php
header('Content-Type: application/json');
require_once 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);

// Accept either email or username in the payload (fields: email, username or identifier)
$identifier = trim($data['email'] ?? $data['identifier'] ?? $data['username'] ?? '');
$password = $data['password'] ?? '';

if (!$identifier || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

// Decides whether the identifier looks like an email
if (strpos($identifier, '@') !== false) {
    $stmt = $pdo->prepare('SELECT id, password_hash, is_admin FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$identifier]);
} else {
    $stmt = $pdo->prepare('SELECT id, password_hash, is_admin FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$identifier]);
}

$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// login successful
session_regenerate_id(true);
$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['is_admin'] = (bool)$user['is_admin'];
echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id'], 'is_admin' => $_SESSION['is_admin']]);
?>