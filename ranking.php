
<?php
include 'conex.php';

// Supondo que o ID do usuário logado está armazenado em uma sessão
session_start();
$id_usuario_logado = $_SESSION['id_usuario'];

// Consulta para obter a posição de todos os usuários
$sql = "
SELECT u.nome, a.id_usuario, SUM(a.Certo) AS total_certo
FROM analise a
JOIN usuari u ON a.id_usuario = u.id_usuario
GROUP BY a.id_usuario
ORDER BY total_certo DESC
";

$result = $conn->query($sql);

$ranking = [];
$posicao_usuario_logado = null;

if ($result->num_rows > 0) {
    // Saída dos dados de cada linha
    $posicao = 1;
    while($row = $result->fetch_assoc()) {
        $row['posicao'] = $posicao;
        $ranking[] = $row;
        
        if ($row['id_usuario'] == $id_usuario_logado) {
            $posicao_usuario_logado = $posicao;
        }
        
        $posicao++;
    }
}

$conn->close();

// Preparar dados para exibição
$response = [
    'top_6' => array_slice($ranking, 0, 6),
    'posicao_usuario_logado' => $posicao_usuario_logado,
    'usuario_logado' => $ranking[$posicao_usuario_logado - 1] ?? null,
    'anterior' => $ranking[$posicao_usuario_logado - 2] ?? null,
    'proximo' => $ranking[$posicao_usuario_logado] ?? null,
];

// Retorna os dados em formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
