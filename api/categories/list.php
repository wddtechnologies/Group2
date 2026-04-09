<?php
require_once __DIR__ . '/../bootstrap.php';

$result = $mysqli->query('SELECT name FROM categories ORDER BY name ASC');

if (!$result) {
  json_response(500, ['message' => 'Failed to load categories']);
}

$categories = [];
while ($row = $result->fetch_assoc()) {
  $categories[] = $row['name'];
}

json_response(200, ['categories' => $categories]);
