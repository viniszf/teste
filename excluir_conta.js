
document.addEventListener('DOMContentLoaded', function () {
    const botaoExcluirConta = document.getElementById('botao-excluir');
    const modalExcluir = document.getElementById('modal-excluir');
    const confirmarExcluirConta = document.getElementById('confirmar-excluir-conta');
    const cancelarExcluirConta = document.getElementById('cancelar-excluir-conta');

    botaoExcluirConta.addEventListener('click', function () {
        modalExcluir.style.display = 'block';
    });

    cancelarExcluirConta.addEventListener('click', function () {
        modalExcluir.style.display = 'none';
    });

    confirmarExcluirConta.addEventListener('click', function () {
        // Faz a requisição para excluir a conta
        fetch('excluir_conta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'cadastro.html';
            } else {
                alert('Erro ao excluir a conta.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});

