<?php
session_start();
include 'conexao.php'; // Inclui o arquivo de conexão com o banco de dados

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$id_usuario = $_SESSION['id_usuario'];
$id_simulado = $_SESSION['id_simulado'];
$certo = $data['certo'];
$errado = $data['errado'];

$sql = "INSERT INTO analise (id_usuario, id_simulado, certo, errado) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('iiii', $id_usuario, $id_simulado, $certo, $errado);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
