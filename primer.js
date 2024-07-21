document.addEventListener('DOMContentLoaded', function() {
    const blinkingImage = document.querySelector('.blinking-image');

    // Aumentar a imagem
    setTimeout(() => {
        blinkingImage.style.transform = 'scale(2)';
    }, 0); // Começa imediatamente

    // Verificar a página anterior e redirecionar adequadamente
    const referrer = document.referrer;

    setTimeout(() => {
        if (referrer.includes('spacequestions.html')) {
            window.location.href = 'cadastro.html'; // Redireciona para a página de cadastro se a página anterior for inicio.html
        } else if (referrer.includes('cadastro.html')) {
            window.location.href = 'login.html'; // Redireciona para a página de login se a página anterior for cadastro.html
        } else if (referrer.includes('login.html')) {
            window.location.href = 'painel.html'; // Redireciona para a página painel se a página anterior for login.html
        } else if (referrer.includes('painel.html')) {
            window.location.href = 'area.html'; // Redireciona para a página area se a página anterior for painel.html
        } else if (referrer.includes('area.html')) {
            window.location.href = 'questao.html'; // Redireciona para a página questao se a página anterior for area.html
        } else {
            window.location.href = 'painel.html'; // Redireciona para a página padrão se a página anterior não for nenhuma das especificadas
        }
    }, 3000); // Espera 10 segundos antes de redirecionar
});

