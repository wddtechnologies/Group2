<?php
require_once __DIR__ . '/../bootstrap.php';

$admin = current_admin();

if (!$admin) {
  json_response(401, ['message' => 'Not authenticated']);
}

json_response(200, ['admin' => $admin]);
