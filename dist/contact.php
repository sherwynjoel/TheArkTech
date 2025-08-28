<?php
// Simple PHP mail handler for shared hosting
// Requires that your hosting provider allows SMTP via PHP mail() or configured sendmail.

header('Cache-Control: no-store');

function redirect_back($ok = false, $error = '') {
  $base = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/';
  $url = preg_replace('/\?.*$/', '', $base);
  $qs = [];
  if ($ok) { $qs[] = 'submitted=1'; }
  if ($error) { $qs[] = 'error=' . urlencode($error); }
  if (!empty($qs)) { $url .= '?' . implode('&', $qs); }
  $url .= '#contact';
  header('Location: ' . $url, true, 303);
  exit;
}

function json_response($arr) {
  header('Content-Type: application/json');
  echo json_encode($arr);
  exit;
}

$dry = (isset($_GET['dry']) && $_GET['dry'] === '1') || getenv('PHP_MAIL_DRY') === '1';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  if ($dry) {
    json_response([ 'ok' => false, 'error' => 'method' ]);
  }
  redirect_back(false, 'method');
}

// Basic validation
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$requirement = trim($_POST['requirement'] ?? '');

if (strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($phone) < 3 || strlen($requirement) < 5) {
  if ($dry) {
    json_response([ 'ok' => false, 'error' => 'validation' ]);
  }
  redirect_back(false, 'validation');
}

// Configure recipient
$to = getenv('PHP_SMTP_TO');
if (!$to) { $to = 'sherwynjoel@thearktech.in'; }
// From header should be your domain email to avoid spam
$from = getenv('PHP_SMTP_FROM');
if (!$from) { $from = 'TheArkTech <no-reply@thearktech.in>'; }

$subject = 'New Contact Form Submission - ' . $name;
$body = "Name: $name\nEmail: $email\nPhone: $phone\nRequirement:\n$requirement\n";

$headers = 'From: ' . $from . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Dry-run for local testing without sending mail
if ($dry) {
  json_response([
    'ok' => true,
    'mode' => 'dry',
    'to' => $to,
    'from' => $from,
    'subject' => $subject,
  ]);
}

// Use mail(); on many shared hosts this routes via sendmail/SMTP relay
if (@mail($to, $subject, $body, $headers)) {
  redirect_back(true, '');
} else {
  redirect_back(false, 'send');
}


