<?php
// Dummy user data
$existing_users = ['john', 'varshini', 'demo'];
$existing_emails = ['test@gmail.com', 'hello@example.com'];

if (isset($_GET['username'])) {
  $username = strtolower(trim($_GET['username']));
  if (in_array($username, $existing_users)) {
    echo "❌ Username already taken";
  } else {
    echo "✅ Username available";
  }
}

if (isset($_GET['email'])) {
  $email = strtolower(trim($_GET['email']));
  if (in_array($email, $existing_emails)) {
    echo "❌ Email already registered";
  } else {
    echo "✅ Email available";
  }
}
?>
