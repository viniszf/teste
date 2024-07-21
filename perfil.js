
document.addEventListener('DOMContentLoaded', function() {
    fetch('perfil.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('nome').innerText = data.nome;
            document.getElementById('email').innerText = data.email;
            const fotoPerfil = document.getElementById('foto-perfil');
            if (data.foto) {
                fotoPerfil.src = 'data:image/jpeg;base64,' + data.foto;
            } else {
                fotoPerfil.src = 'perfil.png';
            }
        })
        .catch(error => console.error('Erro:', error));

    const fotoPerfilContainer = document.getElementById('foto-perfil-container');
    const inputFoto = document.getElementById('input-foto');
    const modal = document.getElementById('modal');
    const confirmarMudar = document.getElementById('confirmar-mudar');
    const confirmarExcluir = document.getElementById('confirmar-excluir'); // novo botão
    const cancelarMudar = document.getElementById('cancelar-mudar');
    let novaImagem = null;

    fotoPerfilContainer.addEventListener('click', function() {
        inputFoto.click();
    });

    inputFoto.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                novaImagem = e.target.result;
                modal.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    confirmarMudar.addEventListener('click', function() {
        if (novaImagem) {
            document.getElementById('foto-perfil').src = novaImagem;
            fetch('upload_foto.php', {
                method: 'POST',
                body: JSON.stringify({ imagem: novaImagem.split(',')[1] }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Foto de perfil atualizada com sucesso!');
                } else {
                    alert('Erro ao atualizar a foto de perfil.');
                }
                modal.style.display = 'none';
            })
            .catch(error => {
                console.error('Erro:', error);
                modal.style.display = 'none';
            });
        }
    });

    confirmarExcluir.addEventListener('click', function() { // novo evento
        fetch('excluir_foto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('foto-perfil').src = 'perfil.png';
                console.log('Foto de perfil excluída com sucesso!');
            } else {
                alert('Erro ao excluir a foto de perfil.');
            }
            modal.style.display = 'none';
        })
        .catch(error => {
            console.error('Erro:', error);
            modal.style.display = 'none';
        });
    });

    cancelarMudar.addEventListener('click', function() {
        modal.style.display = 'none';
        novaImagem = null;
    });

    // Fechar o modal se o usuário clicar fora do conteúdo do modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            novaImagem = null;
        }
    });
});