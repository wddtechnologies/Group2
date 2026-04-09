<?php
require_once __DIR__ . '/../bootstrap.php';

require_post();

$input = read_json_body();
$identifier = trim((string) ($input['identifier'] ?? ''));
$password = (string) ($input['password'] ?? '');

if ($identifier === '' || $password === '') {
  json_response(400, ['message' => 'identifier and password are required']);
}

$query = $mysqli->prepare('SELECT id, username, password FROM admins WHERE username = ? LIMIT 1');

if (!$query) {
  json_response(500, ['message' => 'Could not prepare query']);
}

$query->bind_param('s', $identifier);
$ok = $query->execute();
if (!$ok) {
  json_response(500, ['message' => 'Failed to execute login query']);
}

$query->bind_result($adminId, $adminUsername, $adminPasswordHash);
$hasRow = $query->fetch();
$query->close();

$admin = null;
if ($hasRow) {
  $admin = [
    'id' => (int) $adminId,
    'username' => (string) $adminUsername,
    'password' => (string) $adminPasswordHash
  ];
}

$passwordOk = false;
if ($admin) {
  $passwordOk = password_verify($password, $admin['password']) || hash_equals((string) $admin['password'], $password);
}

if (!$admin || !$passwordOk) {
  json_response(401, ['message' => 'Invalid credentials']);
}

$_SESSION['admin'] = [
  'id' => (int) $admin['id'],
  'username' => $admin['username']
];

json_response(200, [
  'admin' => $_SESSION['admin']
]);
