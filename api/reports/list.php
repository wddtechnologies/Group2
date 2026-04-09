<?php
require_once __DIR__ . '/../bootstrap.php';

$sql = 'SELECT id, title, description, category, type, location, contact_info, image_path, status, created_at FROM reports ORDER BY id DESC';
$result = $mysqli->query($sql);

if (!$result) {
  json_response(500, ['message' => 'Failed to load reports']);
}

$reports = [];
while ($row = $result->fetch_assoc()) {
  $reports[] = [
    'id' => (int) $row['id'],
    'title' => $row['title'],
    'description' => $row['description'],
    'category' => $row['category'],
    'type' => $row['type'],
    'location' => $row['location'] ?: null,
    'contactInfo' => $row['contact_info'] ?: null,
    'imagePath' => $row['image_path'] ? '/' . ltrim($row['image_path'], '/') : null,
    'status' => $row['status'],
    'createdAt' => $row['created_at']
  ];
}

json_response(200, ['reports' => $reports]);
