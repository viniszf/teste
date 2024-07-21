<?php
// URL do seu banco de dados Firebase
$firebase_url = 'https://sapa-fa0db-default-rtdb.firebaseio.com';

// Função para enviar dados ao Firebase
function sendDataToFirebase($path, $data) {
    global $firebase_url;
    $url = $firebase_url . $path . '.json';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

// Função para obter dados do Firebase
function getDataFromFirebase($path) {
    global $firebase_url;
    $url = $firebase_url . $path . '.json';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}
?>