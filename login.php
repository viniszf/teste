<?php
include 'conex.php'; // Inclua as funções definidas acima
session_start();

$email = $_POST['email'];
$senha = $_POST['senha'];

// Função para verificar se o email existe no Firebase
function verifyUser($email) {
    $users = getDataFromFirebase("/users");
    if ($users === null) {
        return null; // Retorna null se não conseguir obter os usuários
    }
   
    foreach ($users as $user) {
        if (isset($user['email']) && $user['email'] === $email) {
            return $user;
        }
    }
    return null;
}

$user = verifyUser($email);

if ($user !== null) {
    // Se o email existe, verifique a senha
    if ($user['senha'] === $senha) {
        $_SESSION['id_usuario'] = $user['id_usuario']; // Armazenando id_usuario na sessão
        echo 'success';
    } else {
        echo 'Senha incorreta';
    }
} else {
    echo 'Email não encontrado';
}

exit;
?>