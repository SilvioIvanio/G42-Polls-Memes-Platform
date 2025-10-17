<?php
header('Content-Type: application/json');
require_once 'db.php';
session_start();

// Check for authentication
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$meme_id = (int)($data['meme_id'] ?? 0);
$caption = trim($data['caption'] ?? '');

if (!$meme_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Meme ID is required.']);
    exit;
}

$logged_in_user_id = $_SESSION['user_id'];

// Verify ownership
$stmt = $pdo->prepare('SELECT user_id FROM memes WHERE id = ?');
$stmt->execute([$meme_id]);
$meme = $stmt->fetch();

if (!$meme) {
    http_response_code(404);
    echo json_encode(['error' => 'Meme not found.']);
    exit;
}

if ($meme['user_id'] != $logged_in_user_id) {
    http_response_code(403);
    echo json_encode(['error' => 'You do not have permission to edit this meme.']);
    exit;
}

// Update the meme caption
try {
    $stmt = $pdo->prepare('UPDATE memes SET caption = ? WHERE id = ?');
    $stmt->execute([$caption, $meme_id]);
    echo json_encode(['success' => true, 'caption' => $caption]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update meme caption.']);
}
?>