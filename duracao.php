<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['duracao_simulado'])) {
    echo json_encode(['duracao' => $_SESSION['duracao_simulado']]);
} else {
    echo json_encode(['error' => 'Duracao não definida']);
}
?>

