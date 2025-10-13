<?php
require_once 'db.php';
session_start();
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);
$question = trim($data['question'] ?? '');
$options = $data['options'] ?? [];

if (!$question || !is_array($options) || count($options) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'Question and at least 2 options required']);
    exit;
}

try {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare('INSERT INTO polls (user_id, question) VALUES (?, ?)');
    $stmt->execute([$_SESSION['user_id'], $question]);
    $poll_id = $pdo->lastInsertId();

    $stmtOpt = $pdo->prepare('INSERT INTO poll_options (poll_id, option_text) VALUES (?, ?)');
    foreach ($options as $opt) {
        $opt = trim($opt);
        if ($opt === '') continue;
        $stmtOpt->execute([$poll_id, $opt]);
    }
    $pdo->commit();
    echo json_encode(['success' => true, 'poll_id' => $poll_id]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create poll']);
}
?>