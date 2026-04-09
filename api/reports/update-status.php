<?php
require_once __DIR__ . '/../bootstrap.php';

require_post();
require_admin();

$input = read_json_body();
$id = (int) ($input['id'] ?? 0);
$status = trim((string) ($input['status'] ?? ''));

if ($id <= 0 || !in_array($status, ['Pending', 'Approved', 'Resolved'], true)) {
  json_response(400, ['message' => 'Invalid status update payload']);
}

$stmt = $mysqli->prepare('UPDATE reports SET status = ? WHERE id = ?');
if (!$stmt) {
  json_response(500, ['message' => 'Failed to prepare status update']);
}

$stmt->bind_param('si', $status, $id);
if (!$stmt->execute()) {
  json_response(500, ['message' => 'Failed to update status']);
}

json_response(200, ['ok' => true]);
