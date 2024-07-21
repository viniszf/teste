
let questoes = [];
let indiceAtual = 0;
let contagemCerto = 0;
let contagemErrado = 0;
let intervalo; // Variável global para o intervalo do relógio

// Função para mostrar a questão
function mostrarQuestao(questao) {
    const simulado = document.getElementById('simulado');
    simulado.innerHTML = ''; // Limpa o conteúdo anterior

    const card = document.createElement('div');
    const enunciado = document.createElement('h3');
    enunciado.textContent = `Questão ${indiceAtual + 1}: ${questao.enunciado}`;

    card.append(enunciado);

    // Adicionar imagem se existir
    if (questao.imagem_base64) {
        const img = document.createElement('img');
        img.src = `data:image/png;base64,${questao.imagem_base64}`;
        img.style.maxWidth = '100%'; // Define o tamanho máximo da imagem
        img.style.maxHeight = '300px'; // Define a altura máxima da imagem
        card.append(img);
    }

    const resultado = document.createElement('div');
    resultado.classList.add('resultado');

    const createOption = (label, item, correto) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.width = '20px'; // Aumenta a largura do botão
        btn.style.height = '20px'; // Aumenta a altura do botão
        btn.style.borderRadius = '50%'; // Torna o botão circular
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.marginRight = '10px'; // Adiciona margem entre o botão e o texto

        const itemElement = document.createElement('p');
        itemElement.textContent = item;

        const div = document.createElement('div');
        div.append(btn);
        div.append(itemElement);
        div.classList.add('item');

        btn.addEventListener('click', () => {
            // Resetar todas as opções para o estilo padrão
            document.querySelectorAll('.item').forEach(option => {
                option.style.backgroundColor = '';
            });

            // Marcar a opção selecionada como azul
            div.style.backgroundColor = 'lightblue';

            if (!document.querySelector('.confirmar')) {
                const confirmarBtn = document.createElement('button');
                confirmarBtn.textContent = 'Confirmar Resposta';
                confirmarBtn.classList.add('confirmar', 'bnt-cadastro');
                confirmarBtn.style.marginTop = '10px';

                confirmarBtn.addEventListener('click', () => {
                    if (item === correto) {
                        div.style.backgroundColor = 'lightgreen';
                        contagemCerto++;
                    } else {
                        div.style.backgroundColor = 'mistyrose';
                        const correctOption = Array.from(simulado.getElementsByClassName('item')).find(option => option.textContent.includes(correto));
                        if (correctOption) correctOption.style.backgroundColor = 'lightgreen';
                        contagemErrado++;
                    }

                    confirmarBtn.disabled = true;
                    proximoBtn.disabled = false;
                });

                simulado.append(confirmarBtn);
            }
        });

        return div;
    };

    card.append(createOption(" ", questao.item_a, questao.item_correto));
    card.append(createOption(" ", questao.item_b, questao.item_correto));
    card.append(createOption(" ", questao.item_c, questao.item_correto));
    card.append(createOption(" ", questao.item_d, questao.item_correto));
    card.append(createOption(" ", questao.item_e, questao.item_correto));
    card.classList.add("card");
    card.append(resultado); // Adiciona a mensagem de resultado dentro do card
    simulado.append(card);

    const proximoBtn = document.createElement('button');
    proximoBtn.textContent = 'Próximo';
    proximoBtn.classList.add('proximo', 'bnt-cadastro');
    proximoBtn.style.marginTop = '10px';
    proximoBtn.disabled = true;
    proximoBtn.addEventListener('click', () => {
        indiceAtual++;
        if (indiceAtual < questoes.length) {
            mostrarQuestao(questoes[indiceAtual]);
        } else {
            resultado.textContent = 'Você concluiu o simulado!';
            clearInterval(intervalo); // Para o temporizador
            mostrarResultadoFinal(); // Mostra o resultado final
            enviarAnalise(); // Envia os dados de análise ao final do simulado
        }
    });
    simulado.append(proximoBtn);
}

// Função para obter as questões
function obterQuestoes() {
    fetch('questao.php')
        .then(response => response.json())
        .then(data => {
            questoes = data; // Armazena as questões na variável global
            if (questoes.length > 0) {
                mostrarQuestao(questoes[indiceAtual]);
            } else {
                alert('Nenhuma questão encontrada.');
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert("Erro ao carregar questões.");
        });
}

function enviarAnalise() {
    const data = {
        certo: contagemCerto,
        errado: contagemErrado,
    };

    fetch('analise.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao enviar análise.");
        });
}

// Função para mostrar o resultado final
function mostrarResultadoFinal() {
    const simulado = document.getElementById('simulado');
    simulado.innerHTML = ''; // Limpa o conteúdo anterior para evitar duplicação

    const resultadoFinal = document.createElement('div');
    resultadoFinal.classList.add('textfield');
    resultadoFinal.innerHTML = `
    <div class="card"> 
        <h3>Simulado Concluído</h3>
        <table>
            <tr>
                <th>Acertos</th>
                <td>${contagemCerto}</td>
                <th>Erros</th>
                <td>${contagemErrado}</td>
            </tr>
        </table>
        <button class="bnt-cadastro" onclick="window.location.href='area.html'">Tente novamente</button>
        <button class="bnt-cadastro" onclick="window.location.href='painel.html'">Voltar para o painel</button>
        </div>
    `;

    simulado.appendChild(resultadoFinal);
}

function iniciarRelogio(duracao) {
    const tempoDiv = document.getElementById('tempo');
    let tempoRestante = duracao * 60; // Convertendo minutos para segundos

    const atualizarRelogio = () => {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        tempoDiv.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (tempoRestante > 0) {
            tempoRestante--;
        } else {
            clearInterval(intervalo);
            exibirMensagemTempoEncerrado(); // Exibe a mensagem de tempo encerrado
        }
    };

    atualizarRelogio();
    intervalo = setInterval(atualizarRelogio, 1000); // Armazena o intervalo em uma variável global
}

// Função para obter a duração do simulado e iniciar o relógio
function obterDuracaoESimulado() {
    fetch('duracao.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erro ao obter duração:', data.error);
                alert("Erro ao obter a duração do simulado.");
            } else {
                const duracao = data.duracao; // A duração em minutos
                console.log('Duração do simulado:', duracao);
                iniciarRelogio(duracao);
                obterQuestoes();
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert("Erro ao obter a duração do simulado.");
        });
}

// Função para exibir a mensagem de tempo encerrado e redirecionar
function exibirMensagemTempoEncerrado() {
    const body = document.body;
    body.innerHTML = '<div class="mensagem-encerrado">Tempo encerrado</div>';
    body.style.backgroundColor = 'red';
    body.style.display = 'flex';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';
    body.style.height = '100vh';

    setTimeout(() => {
        exibirResultados();
    }, 5000); // Exibe a mensagem de tempo encerrado por 5 segundos antes de mostrar os resultados
}

function exibirResultados() {
    const body = document.body;
    body.innerHTML = `
        <div class="resultados">
            <h2>Resultados</h2>
            <p>Acertos: ${contagemCerto}</p>
            <p>Erros: ${contagemErrado}</p>
        </div>
    `;
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.justifyContent = 'center';
    body.style.alignItems = 'center';
    body.style.height = '100vh';

    setTimeout(() => {
        window.location.href = 'area.html';
    }, 5000); // Exibe os resultados por 5 segundos antes de redirecionar
}

window.onload = obterDuracaoESimulado;
