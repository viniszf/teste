
<?php
session_start();
include 'conex.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_usuario = $_SESSION['id_usuario']; // Acessa o id do usuário pela sessão
    $estrelas = $_POST['stars'];
    $comentario = $_POST['comment'];
    $data_avaliacao = $_POST['date'];

    // Verifica se o usuário já possui uma avaliação
    $sql_check = "SELECT * FROM avaliacao WHERE id_usuario = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("i", $id_usuario);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        // Se o usuário já possui uma avaliação, atualiza ela
        $sql_update = "UPDATE avaliacao SET estrelas = ?, comentario = ?, data_avaliacao = ? WHERE id_usuario = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("issi", $estrelas, $comentario, $data_avaliacao, $id_usuario);

        if ($stmt_update->execute()) {
            echo "Avaliação atualizada com sucesso!";
        } else {
            echo "Erro ao atualizar avaliação: " . $conn->error;
        }

        $stmt_update->close();
    } else {
        // Caso contrário, insere uma nova avaliação
        $sql_insert = "INSERT INTO avaliacao (id_usuario, estrelas, comentario, data_avaliacao) VALUES (?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("iiss", $id_usuario, $estrelas, $comentario, $data_avaliacao);

        if ($stmt_insert->execute()) {
            echo "Avaliação enviada com sucesso!";
        } else {
            echo "Erro ao enviar avaliação: " . $conn->error;
        }

        $stmt_insert->close();
    }

    $stmt_check->close();
    $conn->close();
}
?>

