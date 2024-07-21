document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que o formulário seja submetido tradicionalmente

  const formData = new FormData(this);
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const emailErrorMessage = document.createElement('span');
  const senhaErrorMessage = document.createElement('span');

  // Remove mensagens de erro anteriores, se houver
  const existingEmailError = document.querySelector('#email-error');
  const existingSenhaError = document.querySelector('#senha-error');
  if (existingEmailError) existingEmailError.remove();
  if (existingSenhaError) existingSenhaError.remove();

  // Verifica se a senha tem pelo menos 8 caracteres
  if (senhaInput.value.length < 8) {
      senhaErrorMessage.id = 'senha-error';
      senhaErrorMessage.textContent = 'A senha deve ter pelo menos 8 caracteres.';
      senhaErrorMessage.style.color = 'rgb(255, 167, 167)';
      senhaInput.parentNode.appendChild(senhaErrorMessage);
      return; // Para a execução se a senha for inválida
  }

  // Utiliza fetch para enviar os dados
  fetch('cadastro.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if(data === 'success') {
      window.location.href = 'login.html'; // Redireciona para o login se o cadastro for bem-sucedido
    } else {
      if (data === 'email_exists') {
          emailErrorMessage.id = 'email-error';
          emailErrorMessage.textContent = 'Este email já está em uso.';
          emailErrorMessage.style.color = 'rgb(255, 167, 167)';
          emailInput.parentNode.appendChild(emailErrorMessage);
      } else {
          alert(data); // Mostra a mensagem de erro geral
      }
    }
  })
  .catch((error) => {
    console.error('Erro:', error);
    alert("Erro no cadastro.");
  });
});