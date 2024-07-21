
document.addEventListener('DOMContentLoaded', function() {
    fetch('ranking.php')
        .then(response => response.json())
        .then(data => {
            if (data && data.top_6 && data.usuario_logado) {  // Verifica se os dados estão no formato esperado
                let leaderboard = document.getElementById('leaderboard');
                leaderboard.innerHTML = '';

                // Exibir os 6 primeiros usuários
                data.top_6.forEach((user, index) => {
                    let position = user.posicao;
                    let rankClass = '';

                    if (position === 1) {
                        rankClass = 'gold';
                    } else if (position === 2) {
                        rankClass = 'silver';
                    } else if (position === 3) {
                        rankClass = 'bronze';
                    }

                    leaderboard.innerHTML += `
                        <div class="rank-item ${rankClass}">
                            <span class="position">${position}°</span>
                            <span class="name">${user.nome}</span>
                            <span class="score">Pontuação: ${user.total_certo}</span>
                        </div>
                    `;
                });

                // Adicionar linha com "..."
                leaderboard.innerHTML += '<div class="rank-item ellipsis">...</div>';

                // Exibir posição anterior ao usuário logado
                if (data.anterior) {
                    leaderboard.innerHTML += `
                        <div class="rank-item">
                            <span class="position">${data.anterior.posicao}°</span>
                            <span class="name">${data.anterior.nome}</span>
                            <span class="score">Pontuação: ${data.anterior.total_certo}</span>
                        </div>
                    `;
                }

                // Exibir posição do usuário logado (destacado)
                let userClass = 'highlight';
                if (data.usuario_logado.posicao === 1) {
                    userClass = 'gold';
                } else if (data.usuario_logado.posicao === 2) {
                    userClass = 'silver';
                } else if (data.usuario_logado.posicao === 3) {
                    userClass = 'bronze';
                }

                leaderboard.innerHTML += `
                    <div class="rank-item ${userClass}">
                        <span class="position">${data.usuario_logado.posicao}°</span>
                        <span class="name">${data.usuario_logado.nome}</span>
                        <span class="score">Pontuação: ${data.usuario_logado.total_certo}</span>
                    </div>
                `;

                // Exibir posição posterior ao usuário logado
                if (data.proximo) {
                    leaderboard.innerHTML += `
                        <div class="rank-item">
                            <span class="position">${data.proximo.posicao}°</span>
                            <span class="name">${data.proximo.nome}</span>
                            <span class="score">Pontuação: ${data.proximo.total_certo}</span>
                        </div>
                    `;
                }
            } else {
                console.error('Returned data is not in the expected format:', data);
            }
        })
        .catch(error => console.error('Error fetching ranking data:', error));
});

