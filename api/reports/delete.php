<?php
require_once __DIR__ . '/../bootstrap.php';

require_post();
require_admin();

$input = read_json_body();
$id = (int) ($input['id'] ?? 0);

if ($id <= 0) {
  json_response(400, ['message' => 'Invalid report id']);
}

$selectStmt = $mysqli->prepare('SELECT image_path FROM reports WHERE id = ? LIMIT 1');
if (!$selectStmt) {
  json_response(500, ['message' => 'Failed to prepare image lookup']);
}
$selectStmt->bind_param('i', $id);
$selectStmt->execute();
$selectResult = $selectStmt->get_result();
$row = $selectResult ? $selectResult->fetch_assoc() : null;

$deleteStmt = $mysqli->prepare('DELETE FROM reports WHERE id = ?');
if (!$deleteStmt) {
  json_response(500, ['message' => 'Failed to prepare report delete']);
}
$deleteStmt->bind_param('i', $id);
if (!$deleteStmt->execute()) {
  json_response(500, ['message' => 'Failed to delete report']);
}

if ($row && !empty($row['image_path'])) {
  $path = dirname(__DIR__, 2) . '/' . ltrim($row['image_path'], '/');
  if (is_file($path)) {
    @unlink($path);
  }
}

json_response(200, ['ok' => true]);
