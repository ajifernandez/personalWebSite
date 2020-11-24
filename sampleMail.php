<?php
    $subject = 'testing';
	$to = 'info@ajifernandez.es';
	$from="agustinjf87@gmail.com"; 
	$headers = "MIME-Version: 1.0\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\n";
	$headers .= "From: <".$from.">\n";
	$headers .= "X-Priority: 1\n";
	$msg = 'cuadro de texto';
	$message='<div style=" width:700px; margin:0 auto; border:1px solid #e2e2e2; padding:20px;">
	<h3>AJIFERNANDEZ Services:</h3>'.$msg.'</div>';
	$message .= "<br/>Regards <br />MYPROPICK.COM";
	
	
	if (mail($to, $subject, $message, $headers )) {
	$data['msg']="Message send successfully";
	} 
	else {
	$data['msg']="Please try again, Message could not be sent!";
	} 
?>