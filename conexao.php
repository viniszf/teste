<?php
include 'conex.php'



$nome = $_POST['nome'];
$duracao = $_POST['duracao'];
$data = $_POST['data'];
$id_usuario =$_SESSION['id_usuario'];

$sql ="INSERT into simulado(data_simulado, duracao, area, id_usuario) values('$data','$duracao','$area','$id_usuario')" ;

if ($conn->query($sql)) {
       echo "success";
    } else {
        echo "Erro ao registrar o simulado.";
    }
$conn->close();
exit;

?>