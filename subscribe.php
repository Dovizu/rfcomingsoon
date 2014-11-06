<?php

$email = trim($_POST['email']);
		
$emailTo = 'donny@roomforward.com';
$subject = '[CS Page] User has subscribed to mailing list';
$body = "Email: $email";
$headers = 'From: ' .' <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

mail($emailTo, $subject, $body, $headers);

?>