<?php
require_once 'db.php';
session_start();

// Fetch polls with options and vote counts
$stmt = $pdo->query('SELECT p.id AS poll_id, p.question, p.created_at, u.username FROM polls p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC LIMIT 50');
$polls = $stmt->fetchAll();

$out = [];
$userId = $_SESSION['user_id'] ?? null;

foreach ($polls as $p) {
    $stmt2 = $pdo->prepare('SELECT o.id, o.option_text, (SELECT COUNT(*) FROM votes v WHERE v.option_id = o.id) AS votes FROM poll_options o WHERE o.poll_id = ?');
    $stmt2->execute([$p['poll_id']]);
    $options = $stmt2->fetchAll();
    
    // Get user's votes for this poll if logged in
    $userVotes = [];
    if ($userId) {
        $stmt3 = $pdo->prepare('SELECT option_id FROM votes WHERE poll_id = ? AND user_id = ?');
        $stmt3->execute([$p['poll_id'], $userId]);
        $userVotes = array_column($stmt3->fetchAll(), 'option_id');
    }
    
    // Mark which options the user voted for
    foreach ($options as &$option) {
        $option['user_voted'] = in_array($option['id'], $userVotes);
    }
    
    $totalVotes = array_sum(array_column($options, 'votes'));
    $out[] = [
        'id' => $p['poll_id'],
        'question' => $p['question'],
        'author' => $p['username'],
        'created_at' => $p['created_at'],
        'total_votes' => $totalVotes,
        'options' => $options
    ];
}

header('Content-Type: application/json');
echo json_encode($out);
?>