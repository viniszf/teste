document.getElementById('botao-logout').addEventListener('click', function() {
    fetch('encerrar.php', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            alert('Falha ao encerrar a sessão.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao encerrar a sessão.');
    });
});


