document.getElementById("myForm2").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário
  
    // Preparando os dados do formulário para envio
    const formData = new FormData(this);
    
    fetch('info.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        if(data === 'success') {
            showMessage("Simulado gerado com sucesso!", "success");
            setTimeout(() => { window.location.href = 'primer.html'; }, 2000); // Redireciona após 5 segundos
        } else {
            showMessage(data, "error");
        }
    })
    .catch((error) => {
        console.error('Erro:', error);
        showMessage("Erro ao gerar o simulado.", "error");
    });
  });
  function showMessage(message, type) {
    const messageBox = document.getElementById("messageBox");
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = "block";
  
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
  }
  
  