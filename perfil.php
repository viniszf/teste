
    
    <?php
    session_start();
    include 'conex.php';
    
    $id_usuario = $_SESSION['id_usuario'];
    
    $sql = "SELECT nome, email, encrypted_image FROM usuari WHERE id_usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $stmt->bind_result($nome, $email, $encrypted_image);
    $stmt->fetch();
    $stmt->close();
    $conn->close();
    
    $foto = $encrypted_image ? base64_encode($encrypted_image) : null;
    
    echo json_encode(array(
        "nome" => $nome,
        "email" => $email,
        "foto" => $foto
    ));
    ?>