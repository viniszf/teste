
<?php
include 'conex.php';

$enunciado = $_POST['enunciado'];
$item_a = $_POST['a'];
$item_b = $_POST['b'];
$item_c = $_POST['c'];
$item_d = $_POST['d'];
$item_e = $_POST['e'];
$area = $_POST['area'];
$correto = $_POST['correto'];
$imagem_base64 = $_POST['imagem_base64'] ?? null; // Pode ser nulo se nenhuma imagem for enviada

$sql = "INSERT INTO questoes (enunciado, item_a, item_b, item_c, item_d, item_e, area, item_correto, imagem_base64) 
        VALUES ('$enunciado', '$item_a', '$item_b', '$item_c', '$item_d', '$item_e', '$area', '$correto', '$imagem_base64')";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "Erro ao registrar questões: " . $conn->error;
}

$conn->close();
exit;
?>