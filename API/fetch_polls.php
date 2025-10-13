<?php
require_once 'db.php';

// Fetch polls with options and vote counts
$stmt = $pdo->query('SELECT p.id AS poll_id, p.question, p.created_at, u.username FROM polls p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC LIMIT 50');
$polls = $stmt->fetchAll();

$out = [];

foreach ($polls as $p) {
    $stmt2 = $pdo->prepare('SELECT o.id, o.option_text, (SELECT COUNT(*) FROM votes v WHERE v.option_id = o.id) AS votes FROM poll_options o WHERE o.poll_id = ?');
    $stmt2->execute([$p['poll_id']]);
    $options = $stmt2->fetchAll();
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