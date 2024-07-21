<?php
include 'conex.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

// Função para verificar se o email já está em uso no Firebase
function emailExists($email) {
    $users = getDataFromFirebase("/users");
    if ($users === null) {
        return false; // Assume que o email não existe se não conseguir obter os usuários
    }
   
    foreach ($users as $user) {
        if (isset($user['email']) && $user['email'] === $email) {
            return true;
        }
    }
    return false;
}

if (emailExists($email)) {
    echo 'email_exists';
} else {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (strlen($senha) < 8) {
        echo 'A senha deve ter pelo menos 8 caracteres.';
        exit;
    }

    // Se o email não estiver em uso e a senha for válida, realiza o cadastro
    $userData = [
        'nome' => $nome,
        'email' => $email,
        'senha' => $senha,
        'id_usuario' => uniqid() // Geração de um ID único para o usuário
    ];

    $response = sendDataToFirebase("/users/" . $userData['id_usuario'], $userData);
    if ($response) {
        echo "success";
    } else {
        echo "Error ao cadastrar usuário.";
    }
}

exit;
?>