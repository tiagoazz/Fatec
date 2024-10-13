<?php
// Recebe os dados do formulário
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Endereço de e-mail do dono do site (substituído pelo e-mail de Tiago)
$to = 'tiago.azevedo.massarin@gmail.com';

// Assunto do e-mail
$subject = 'Nova mensagem do formulário de contato';

// Corpo do e-mail
$email_message = "Nome: $name\n";
$email_message .= "E-mail: $email\n";
$email_message .= "Mensagem: $message\n";

// Cabeçalhos
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Envia o e-mail
mail($to, $subject, $email_message, $headers);

// Redireciona de volta para a página de contato com uma mensagem de sucesso
header('Location: contact.html?success=1');
?>
