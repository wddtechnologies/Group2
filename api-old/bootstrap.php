<?php
$config = require __DIR__ . '/config.php';

if (!headers_sent()) {
  header('Content-Type: application/json; charset=utf-8');
}

session_name($config['session_name'] ?? 'lostfound_admin_session');
session_start();

function json_response(int $statusCode, array $payload): void
{
  http_response_code($statusCode);
  echo json_encode($payload);
  exit;
}

try {
  $mysqli = new mysqli(
    $config['host'],
    $config['username'],
    $config['password'],
    $config['database'],
    (int) ($config['port'] ?? 3306)
  );
} catch (Throwable) {
  json_response(500, ['message' => 'Database connection failed']);
}

if ($mysqli->connect_errno) {
  json_response(500, ['message' => 'Database connection failed']);
}

$mysqli->set_charset('utf8mb4');

function require_post(): void
{
  if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(405, ['message' => 'Method not allowed']);
  }
}

function read_json_body(): array
{
  $raw = file_get_contents('php://input');
  $decoded = json_decode($raw ?: '{}', true);

  return is_array($decoded) ? $decoded : [];
}

function current_admin(): ?array
{
  $admin = $_SESSION['admin'] ?? null;
  return is_array($admin) ? $admin : null;
}

function require_admin(): array
{
  $admin = current_admin();
  if (!$admin) {
    json_response(401, ['message' => 'Not authenticated']);
  }

  return $admin;
}
