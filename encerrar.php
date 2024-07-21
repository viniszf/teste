<?php
include 'conex.php'; // Inclui a conexão com o banco de dados

session_start();
if (isset($_SESSION['id_usuario'])) {
    unset($_SESSION['id_usuario']); // Remove o id_usuario da sessão
    session_destroy(); // Destrói a sessão
    http_response_code(200); // Resposta de sucesso
} else {
    http_response_code(400); // Resposta de erro
}
?>
