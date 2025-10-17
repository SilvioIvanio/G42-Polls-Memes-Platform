<?php
header('Content-Type: application/json');
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

// Check if poll allows multiple votes
$stmt = $pdo->prepare('SELECT allow_multiple_choices FROM polls WHERE id = ?');
$stmt->execute([$poll_id]);
$poll = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$poll) {
    http_response_code(404);
    echo json_encode(['error' => 'Poll not found']);
    exit;
}

// If multiple votes are not allowed, check if user has already voted
if (!$poll['allow_multiple_choices']) {
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM votes WHERE poll_id = ? AND user_id = ?');
    $stmt->execute([$poll_id, $_SESSION['user_id']]);
    if ($stmt->fetchColumn() > 0) {
        http_response_code(400);
        echo json_encode(['error' => 'You have already voted in this poll.']);
        exit;
    }
}

// Insert the new vote
$stmt = $pdo->prepare('INSERT INTO votes (poll_id, option_id, user_id) VALUES (?, ?, ?)');
try {
    $stmt->execute([$poll_id, $option_id, $_SESSION['user_id']]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to record vote.']);
}
?>