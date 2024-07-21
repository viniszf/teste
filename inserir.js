
document.getElementById('myForm2').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que o formulário seja submetido tradicionalmente
  
  const formData = new FormData(this);
  const fileInput = document.getElementById('imagem');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onloadend = function() {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
          formData.append('imagem_base64', base64String);
          
          // Utiliza fetch para enviar os dados
          fetch('inserir.php', {
              method: 'POST',
              body: formData
          })
          .then(response => response.text())
          .then(data => {
              if(data === 'success') {
                  alert('Cadastrado com sucesso!!!');
              } else {
                  alert(data); 
              }
          })
          .catch((error) => {
              console.error('Erro:', error);
              alert("Erro no cadastro.");
          });
      }
      reader.readAsDataURL(file);
  } else {
      // Se nenhuma imagem for selecionada, enviar o formulário sem a imagem
      fetch('inserir.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.text())
      .then(data => {
          if(data === 'success') {
              alert('Cadastrado com sucesso!!!');
          } else {
              alert(data); 
          }
      })
      .catch((error) => {
          console.error('Erro:', error);
          alert("Erro no cadastro.");
      });
  }
});