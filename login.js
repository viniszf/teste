document.getElementById('myForm2').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que o formulário seja submetido tradicionalmente
  
  const formData = new FormData(this);
  
  // Remove mensagens de erro anteriores, se houver
  document.getElementById('emailError').textContent = '';
  document.getElementById('senhaError').textContent = '';
  
  // Utiliza fetch para enviar os dados
  fetch('login.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if(data === 'success') {
      window.location.href = 'primer.html'; // Redireciona para o login se o cadastro for bem-sucedido
    } else {
      // Mostra a mensagem de erro abaixo do campo correspondente
      if(data === 'Email não encontrado') {
          document.getElementById('emailError').textContent = data;
      } else if(data === 'Senha incorreta') {
          document.getElementById('senhaError').textContent = data;
      } else {
          alert(data); // Outras mensagens de erro não relacionadas ao campo
      }
    }
  })
  .catch((error) => {
    console.error('Erro:', error);
    alert("Erro no cadastro.");
  });
});
