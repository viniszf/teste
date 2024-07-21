
<?php
    session_start();
    include 'conex.php';
    
    $id_usuario = $_SESSION['id_usuario'];
    $data = json_decode(file_get_contents('php://input'), true);
    $imagem = base64_decode($data['imagem']);
    
    $sql = "UPDATE usuari SET encrypted_image = ? WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $imagem, $id_usuario);
    $success = $stmt->execute();
    $stmt->close();
    $conn->close();
    
    echo json_encode(array("success" => $success));
?>