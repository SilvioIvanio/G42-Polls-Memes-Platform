<?php
header('Content-Type: application/json');
require_once 'db.php';
session_start();

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if (empty($_FILES['meme'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded']);
    exit;
}

$caption = trim($_POST['caption'] ?? '');
$file = $_FILES['meme'];

$allowed = ['image/png','image/jpeg','image/jpg','image/gif'];
if (!in_array($file['type'], $allowed)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Please upload a JPG, PNG, or GIF.']);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 5MB)']);
    exit;
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('m_') . '.' . $ext;
$target = UPLOAD_DIR . $filename;

if (!move_uploaded_file($file['tmp_name'], $target)) {
    http_response_code(500);
    echo json_encode(['error' => 'Upload failed']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO memes (user_id, filename, caption) VALUES (?, ?, ?)');
    $stmt->execute([$_SESSION['user_id'], $filename, $caption]);
    echo json_encode(['success' => true, 'filename' => $filename]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
?>