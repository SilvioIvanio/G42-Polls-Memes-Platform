<?php
require_once 'db.php';
$stmt = $pdo->query('SELECT m.id, m.user_id, m.filename, m.caption, u.username, m.created_at FROM memes m JOIN users u ON m.user_id = u.id ORDER BY m.created_at DESC LIMIT 50');
$memes = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($memes);
?>