<?php

$email = trim($_POST['email']);
$name = trim($_POST['name']);

$message = trim($_POST['message']);
		
$emailTo = 'jasper@roomforward.com';
$subject = '[CS Page] Request for contact has been made';
$body = "Name: $name \r\nEmail: $email \r\nMessage: $message";
$headers = 'From: ' .' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

mail($emailTo, $subject, $body, $headers);

?>