<?php
session_start();
include 'conex.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true); // Lê o JSON da requisição
    $certo = $input['certo'];
    $errado = $input['errado'];
    $area = $_SESSION['area']; // Obtém a área da sessão
    $id_simulado = $_SESSION['id_simulado'];
    $id_usuario = $_SESSION['id_usuario'];

    $sql = "INSERT INTO analise (id_simulado, id_usuario, certo, errado, area) VALUES ('$id_simulado', '$id_usuario', '$certo', '$errado', '$area')";
    if ($conn->query($sql)) {
        echo "Análise armazenada com sucesso na tabela analise.";
    } else {
        echo "Erro ao armazenar análise na tabela analise: " . $conn->error;
    }
}
?>
