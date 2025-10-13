<?php
require_once 'db.php';
session_start();
$data = json_decode(file_get_contents('php://input'), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$stmt = $pdo->prepare('SELECT id, password_hash, is_admin FROM users WHERE email = ? LIMIT 1');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
    exit;
}

// successful login
session_regenerate_id(true);
$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['is_admin'] = (bool)$user['is_admin'];
echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id'], 'is_admin' => $_SESSION['is_admin']]);
?>