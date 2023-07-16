document.addEventListener('DOMContentLoaded', function() {
    let loggedIn = localStorage.getItem('loggedIn');
  
    if (loggedIn !== 'true') {
      window.location.href = 'login.html';
    }

    let perguntas = JSON.parse(localStorage.getItem('perguntas'));
    console.log(perguntas)

    let perguntaId = JSON.parse(localStorage.getItem('perguntaID'));
    console.log(perguntaId)
});

function loadQuestions() {
  fetch('../api/db.json')
    .then(response => response.json())
    .then(data => {
      const perguntas = data.perguntas;
      const questionsContainer = document.getElementById('questionsContainer');

      perguntas.forEach(pergunta => {
        const divPergunta = document.createElement('div');
        divPergunta.classList.add('pergunta');

        const titulo = document.createElement('h3');
        titulo.textContent = pergunta.title;

        const descricao = document.createElement('p');
        descricao.textContent = pergunta.question;

        divPergunta.appendChild(titulo);
        divPergunta.appendChild(descricao);

        questionsContainer.appendChild(divPergunta);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as perguntas:', error);
    });
}

window.onload = loadQuestions;


let visibleModal = false;
const questions = [];
const modalContainer = document.getElementById("modalContainer");
const questionsContainer = document.getElementById("questionsContainer");

function toggleModal() {
  visibleModal = !visibleModal;
  modalContainer.style.display = visibleModal ? "flex" : "none";
}

function enviarPergunta() {
  const titulo = document.getElementById("inputTitulo").value.trim();
  const pergunta = document.getElementById("inputPergunta").value.trim();

  if (!titulo || !pergunta) {
    alert("Campos preenchidos incorretamente!");
    return;
  }

  const url = 'http://localhost:3000/perguntas/';


  const data = {
      title: titulo,
      question: pergunta,
  };

  fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('perguntas', JSON.stringify(data));
      localStorage.setItem('perguntaID', JSON.stringify(data.id));

      const user = JSON.parse(localStorage.getItem('user')); 

      const dataUser = {
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        senha: user.senha,
        meusLivros: user.meusLivros,
        minhasPerguntas: [...user.minhasPerguntas, data.id],
        id: user.id
      }


      fetch(`http://localhost:3000/cadastro/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser),
      })
      .then(responseUser => {
          if (responseUser.ok) {
            fetch('../api/db.json')
            .then(e=>e.json())
            .then(e=>{
                e.cadastro.map((item)=>{
                    if(item.email === user.email && item.senha === user.senha){
                        localStorage.setItem('user', JSON.stringify(item));
                    }
                })
            })
          } else {
            console.error('Erro ao adicionar o livro');
        }
      })
      
      //toggleModal();

    })
    .catch(error => {
        alert('Erro ao enviar pergunta!');
    });

  // questions.push({ titulo, pergunta });

  // const questionElement = document.createElement("div");
  // questionElement.innerHTML = `<h3>${titulo}</h3><p>${pergunta}</p>`;
  // questionsContainer.appendChild(questionElement);

  
}

function fecharModal() {
  toggleModal();
}