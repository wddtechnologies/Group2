<?php
require_once __DIR__ . '/../bootstrap.php';

require_post();

$input = read_json_body();

$title = trim((string) ($input['title'] ?? ''));
$description = trim((string) ($input['description'] ?? ''));
$category = trim((string) ($input['category'] ?? ''));
$type = trim((string) ($input['type'] ?? ''));
$location = trim((string) ($input['location'] ?? ''));
$contactInfo = trim((string) ($input['contact_info'] ?? ''));
$imageDataUrl = (string) ($input['image_data_url'] ?? '');

if ($title === '' || $description === '' || $category === '' || !in_array($type, ['Lost', 'Found'], true)) {
  json_response(400, ['message' => 'Invalid report payload']);
}

$imagePath = null;
if ($imageDataUrl !== '') {
  if (!preg_match('/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/', $imageDataUrl, $matches)) {
    json_response(400, ['message' => 'Invalid image data']);
  }

  $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
  $imageBinary = base64_decode($matches[2], true);
  if ($imageBinary === false) {
    json_response(400, ['message' => 'Image decode failed']);
  }

  $uploadDirFs = dirname(__DIR__) . '/uploads';
  if (!is_dir($uploadDirFs) && !mkdir($uploadDirFs, 0755, true)) {
    json_response(500, ['message' => 'Could not create upload directory']);
  }

  $filename = 'report_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
  $fullPath = $uploadDirFs . '/' . $filename;

  if (file_put_contents($fullPath, $imageBinary) === false) {
    json_response(500, ['message' => 'Failed to save image']);
  }

  $imagePath = 'api/uploads/' . $filename;
}

$stmt = $mysqli->prepare('
  INSERT INTO reports (title, description, category, type, location, contact_info, image_path, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, "Pending")
');

if (!$stmt) {
  json_response(500, ['message' => 'Failed to prepare report insert']);
}

$locationOrNull = $location !== '' ? $location : null;
$contactOrNull = $contactInfo !== '' ? $contactInfo : null;

$stmt->bind_param('sssssss', $title, $description, $category, $type, $locationOrNull, $contactOrNull, $imagePath);

if (!$stmt->execute()) {
  json_response(500, ['message' => 'Failed to create report']);
}

json_response(201, ['id' => (int) $stmt->insert_id]);
