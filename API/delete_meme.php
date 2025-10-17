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

if (!$meme_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Meme ID is required.']);
    exit;
}

$logged_in_user_id = $_SESSION['user_id'];

// Verify ownership and get filename
$stmt = $pdo->prepare('SELECT user_id, filename FROM memes WHERE id = ?');
$stmt->execute([$meme_id]);
$meme = $stmt->fetch();

if (!$meme) {
    http_response_code(404);
    echo json_encode(['error' => 'Meme not found.']);
    exit;
}

if ($meme['user_id'] != $logged_in_user_id) {
    http_response_code(403);
    echo json_encode(['error' => 'You do not have permission to delete this meme.']);
    exit;
}

// Delete the meme file and then the database record
try {
    // 1. Delete the file from the uploads directory
    $filepath = UPLOAD_DIR . $meme['filename'];
    if (file_exists($filepath)) {
        unlink($filepath);
    }

    // 2. Delete the record from the database
    $stmt = $pdo->prepare('DELETE FROM memes WHERE id = ?');
    $stmt->execute([$meme_id]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete meme.']);
}
?>