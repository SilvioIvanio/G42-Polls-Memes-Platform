<?php
require_once 'db.php';
session_start();
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
$poll_id = (int)($data['poll_id'] ?? 0);
$option_id = (int)($data['option_id'] ?? 0);

if (!$poll_id || !$option_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$stmt = $pdo->prepare('DELETE FROM votes WHERE poll_id = ? AND option_id = ? AND user_id = ?');
try {
    $stmt->execute([$poll_id, $option_id, $_SESSION['user_id']]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to remove vote']);
}
?>