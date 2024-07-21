<?php
session_start();
include 'conex.php';

// Verifica se é uma submissão do formulário de simulado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $area = $_POST['area'];
    $duracao = $_POST['duracao']; // Tempo em minutos
    $data = $_POST['data'];
    $quantidade = $_POST['quantidade'];
    $id_usuario = $_SESSION['id_usuario'];

    // Obtém a data atual do servidor
    $data_atual = date('Y-m-d');

    // Verifica se a data da prova é igual à data atual
    if ($data !== $data_atual) {
        echo "A data da prova não corresponde à data atual.";
    } else {
        // Consulta para verificar a quantidade de questões disponíveis no banco de dados
        $sql_check = "SELECT COUNT(*) as total_questoes FROM questoes WHERE area = '$area'";
        $result = $conn->query($sql_check);
        $row = $result->fetch_assoc();

        if ($row['total_questoes'] < $quantidade) {
            echo "Quantidade de questões solicitadas excede o número de questões disponíveis.";
        } else {
            // Calcula o tempo máximo permitido (5 minutos por questão)
            $tempo_maximo_permitido = $quantidade * 4;
            $tempo_minimo_permitido = $quantidade * 1;

            if ($duracao < $tempo_minimo_permitido || $duracao > $tempo_maximo_permitido) {
                echo "A duração informada está fora do intervalo permitido. O tempo mínimo necessário é de " . $tempo_minimo_permitido . " minutos e o tempo máximo permitido é de " . $tempo_maximo_permitido . " minutos.";
            } else {
                $_SESSION['area'] = $area;
                $_SESSION['quantidade'] = $quantidade;
                $_SESSION['duracao_simulado'] = $duracao;

                $sql = "INSERT INTO simulado (data, duracao_simulado, id_usuario, area, quantidade) VALUES ('$data', '$duracao', '$id_usuario', '$area', $quantidade)";

                if ($conn->query($sql)) {
                    $_SESSION['id_simulado'] = $conn->insert_id; // Armazena o ID do simulado na sessão
                    echo "success";
                } else {
                    echo "Erro ao registrar o simulado.";
                }
            }
        }
    }

    $conn->close();
    exit;
}
