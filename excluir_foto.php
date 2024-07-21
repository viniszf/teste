<?php
    session_start();
    include 'conex.php';
    
    $id_usuario = $_SESSION['id_usuario'];
    
    $sql = "UPDATE usuari SET encrypted_image = NULL WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $success = $stmt->execute();
    $stmt->close();
    $conn->close();
    
    echo json_encode(array("success" => $success));
?>