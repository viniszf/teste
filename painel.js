function addRating(stars) {
    document.querySelectorAll('.stars').forEach((star, index) => {
        if (index < stars) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
    document.getElementById('starRating').value = stars;
}

function submitReview() {
    const stars = document.getElementById('starRating').value;
    const comment = document.getElementById('comment').value;
    const date = new Date().toISOString(); // Data atual no formato ISO 8601

    document.getElementById('date').value = date; // Define a data no campo oculto

    const formData = new FormData();
    formData.append('stars', stars);
    formData.append('comment', comment);
    formData.append('date', date);

    fetch('painel.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        displayReviewCard(stars, comment, date);
    })
    .catch(error => {
        console.error('Erro ao enviar avaliação:', error);
    });
}

function displayReviewCard(stars, comment, date) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'show');
    
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <h2>Avaliação Enviada</h2>
        <p>Estrelas: ${stars}</p>
        <p>Comentário: ${comment}</p>
        <p>Data: ${new Date(date).toLocaleString()}</p> <!-- Formatação amigável da data -->
    `;
    overlay.appendChild(reviewCard);
    document.body.appendChild(overlay);
    
// Fechar o card automaticamente após 3 segundos
setTimeout(() => {
    closeReviewCard();
}, 3000);
}

function closeReviewCard() {
const overlay = document.querySelector('.overlay');
if (overlay) {
    overlay.remove();
}
}


