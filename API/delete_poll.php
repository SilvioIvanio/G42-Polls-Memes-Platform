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
$poll_id = (int)($data['poll_id'] ?? 0);

if (!$poll_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Poll ID is required.']);
    exit;
}

$logged_in_user_id = $_SESSION['user_id'];

// Verify ownership
$stmt = $pdo->prepare('SELECT user_id FROM polls WHERE id = ?');
$stmt->execute([$poll_id]);
$poll = $stmt->fetch();

if (!$poll) {
    http_response_code(404);
    echo json_encode(['error' => 'Poll not found.']);
    exit;
}

if ($poll['user_id'] != $logged_in_user_id) {
    http_response_code(403);
    echo json_encode(['error' => 'You do not have permission to delete this poll.']);
    exit;
}

// Delete the poll
try {
    $stmt = $pdo->prepare('DELETE FROM polls WHERE id = ?');
    $stmt->execute([$poll_id]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete poll.']);
}
?>