<?php
session_start();
include 'conex.php';
$area = $_SESSION['area'];
$quant = $_SESSION['quantidade'];

$sql = "SELECT * FROM questoes WHERE area='$area' ORDER BY RAND() LIMIT $quant";

$result = $conn->query($sql);
$lista_q = array();

if ($result) {
    while($row = $result->fetch_assoc()){
        $lista_q[] = $row;
    }
    echo JSON_encode($lista_q);
} else {
    echo "Erro ao buscar questões: " . $conn->error;
}
$conn->close();
?>
