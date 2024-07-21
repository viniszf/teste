<?php
session_start();
include 'conex.php';

$id_usuario = $_SESSION['id_usuario'];
$area = isset($_GET['area']) ? $_GET['area'] : '';

$query = "SELECT SUM(certo) as certo, SUM(errado) as errado FROM analise WHERE id_usuario = ?";
if ($area) {
    $query .= " AND area = ?";
}

$stmt = $conn->prepare($query);

if ($area) {
    $stmt->bind_param("is", $id_usuario, $area);
} else {
    $stmt->bind_param("i", $id_usuario);
}

$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

echo json_encode($data);
?>

