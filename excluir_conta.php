
<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['id_usuario'])) {
        $id_usuario = $_SESSION['id_usuario'];

        // Inclui a conexão com o banco de dados
        include 'conex.php';

        // SQL para deletar o usuário
        $sql = "DELETE FROM usuari WHERE id_usuario = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id_usuario);

        if ($stmt->execute()) {
            // Exclui a sessão do usuário
            session_destroy();
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao excluir a conta']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'ID do usuário não fornecido']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método inválido']);
}
?>
