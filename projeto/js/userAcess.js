//evento executado automaticamente quando carrega a página para saber se o usuário fez login
document.addEventListener('DOMContentLoaded', function() {
    let menuAcess = document.getElementById('menu_cadastro')
    let loggedIn = localStorage.getItem('loggedIn');
    let userIcon = document.getElementById('userIcon');
    

    let div = document.createElement("div")
    let inicialNome = localStorage.getItem('letraNome');
    let estrutura;

    if(inicialNome === null){
      estrutura = `<span class="letra"></span>`
    } else{
      estrutura = `<span class="letra">${inicialNome}</span>`
    }
  
    if (loggedIn === 'true') {
      // Exibe o ícone da conta do usuário
      userIcon.style.display = 'block';
      menuAcess.style.display = 'none';

      div.innerHTML = estrutura

      AlocarLetra.appendChild(div)
    } else {
      // Oculta o ícone da conta do usuário
      userIcon.style.display = 'none';
    }
});


// modal quando icone user for clicado
var userIcon = document.getElementById('userIcon');
var userModal = document.getElementById('userModal');

userIcon.addEventListener('click', function() {
    userModal.classList.add('open');
});

window.addEventListener('click', function(event) {
    if (event.target !== userIcon && !userModal.contains(event.target)) {
        userModal.classList.remove('open');
    }
});

// Adicionar evento de rolagem para fechar o modal
window.addEventListener('scroll', function() {
  userModal.classList.remove('open');
});


// Obtém o elemento do botão de sair
const sairButton = document.getElementById('userSair');

// Adiciona o ouvinte de evento ao botão
sairButton.addEventListener('click', () => {
    console.log('Botao sair')
  // Define o valor do localStorage para "false"
  localStorage.setItem('loggedIn', 'false');

  // Recarrega a página
  window.location.reload();
});
