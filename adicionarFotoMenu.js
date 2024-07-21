
document.addEventListener('DOMContentLoaded', function() {
    const fetchUserData = async () => {
        try {
            const response = await fetch('perfil.php');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro:', error);
            return null;
        }
    };

    const adicionarFotoNosMenus = (data) => {
        const menus = document.querySelectorAll('.menu');
        menus.forEach(menu => {
            const fotoContainer = document.createElement('div');
            fotoContainer.classList.add('foto-menu-container');

            const fotoPerfil = document.createElement('img');
            fotoPerfil.classList.add('foto-menu');
            fotoPerfil.alt = 'Foto de Perfil';
            fotoPerfil.src = data.foto ? 'data:image/jpeg;base64,' + data.foto : 'perfil.png';

            // Cria o menu de opções
            const opcoesMenu = document.createElement('div');
            opcoesMenu.classList.add('opcoes-menu');

            const irParaPerfil = document.createElement('a');
            irParaPerfil.href = 'perfil.html';
            irParaPerfil.innerText = 'Ir para Perfil';
            opcoesMenu.appendChild(irParaPerfil);

            const cancelar = document.createElement('a');
            cancelar.href = '#'; // ou "javascript:void(0);" para não fazer nada
            cancelar.innerText = 'Cancelar';
            cancelar.addEventListener('click', (e) => {
                e.preventDefault();
                fotoContainer.classList.remove('show');
            });
            opcoesMenu.appendChild(cancelar);

            fotoContainer.appendChild(fotoPerfil);
            fotoContainer.appendChild(opcoesMenu);

            fotoPerfil.addEventListener('click', () => {
                fotoContainer.classList.toggle('show');
            });

            menu.appendChild(fotoContainer);
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.foto-menu-container')) {
                document.querySelectorAll('.foto-menu-container').forEach(container => {
                    container.classList.remove('show');
                });
            }
        });
    };

    fetchUserData().then(data => {
        if (data) {
            adicionarFotoNosMenus(data);
        }
    });
});
