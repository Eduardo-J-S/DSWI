document.addEventListener('DOMContentLoaded', function () {
  let loggedIn = localStorage.getItem('loggedIn');

  if (loggedIn !== 'true') {
    window.location.href = 'login.html';
  }
});

function loadQuestions() {
  fetch('../api/db.json')
    .then(response => response.json())
    .then(data => {
      const perguntas = data.perguntas;
      const questionsContainer = document.getElementById('questionsContainer');
      const user = JSON.parse(localStorage.getItem('user'));

      perguntas.forEach(pergunta => {

        let deleteStructure;

        if (user.minhasPerguntas.includes(pergunta.id)) {
          deleteStructure = `
            <i class="fas fa-trash icon-comment"></i>
          `;
        } else {
          deleteStructure = ``;
        }


        let modalContent = document.createElement("div");
        modalContent.classList.add("pergunta");

        let title = pergunta.title;
        let descricaoR = pergunta.question;

        let modalStructure = `
              <h3 class="title-forum">${title}<h3/>
              <p class="question-forum">${descricaoR}</p>
              <i class="fa-solid fa-comment icon-comment"></i>
              <i class="fa-solid fa-flag icon-comment"></i>
              ${deleteStructure}
        `

        modalContent.innerHTML = modalStructure;

        questionsContainer.appendChild(modalContent);


        const iconComments = document.querySelectorAll('.fa-comment');
        iconComments.forEach((iconComment, index) => {
          iconComment.addEventListener('click', () => {
            const pergunta = perguntas[index];
            const perguntaId = pergunta.id;
            const titulo = pergunta.title;
            const questao = pergunta.question;
            const respostasPergunta = pergunta.respostas || [];
            const respostas = respostasPergunta.map(resposta => resposta.resposta);
            const respostasId = respostasPergunta.map(resposta => resposta.id);
            openModalAnswers(respostas, perguntaId, titulo, questao, respostasId, respostasPergunta);
          });
        });

        const report = document.querySelectorAll('.fa-flag');
        report.forEach((iconReport, index) => {
          iconReport.addEventListener('click', () => {
            const pergunta = perguntas[index];
            const perguntaId = pergunta.id;
            if (selectedQuestionId !== perguntaId) {
              openModalReport(perguntaId);
            }
          });
        });
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as perguntas:', error);
    });
}

window.onload = loadQuestions;


function openModalAnswers(respostas, perguntaId, titulo, questao, respostasId, respostaCompleta) {
  const modal = document.getElementById('modalRespostas');
  const modalContent = modal.querySelector('.modal-content-answer');

  modalContent.innerHTML = '';

  const titleElement = document.createElement('h2');
  titleElement.textContent = titulo;
  titleElement.classList.add('title-modal-answer');
  modalContent.appendChild(titleElement);

  const questionElement = document.createElement('p');
  questionElement.textContent = questao;
  questionElement.classList.add('question-modal-answer');
  modalContent.appendChild(questionElement);

  const sendInput = document.createElement('button');
  sendInput.textContent = "Enviar";
  sendInput.classList.add('modal-send-button');
  modalContent.appendChild(sendInput);

  const respostaInput = document.createElement('textarea');
  //respostaInput.setAttribute('type', 'text');
  respostaInput.setAttribute('placeholder', 'Digite sua resposta');
  respostaInput.classList.add('modal-input');
  modalContent.appendChild(respostaInput);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.classList.add('modal-close');
  modalContent.appendChild(closeButton);

  respostas.forEach((resposta, index) => {
    const reportElement = document.createElement('i');
    reportElement.classList.add("fa-solid", "fa-flag");
    modalContent.appendChild(reportElement);

    const respostaElement = document.createElement('p');
    respostaElement.textContent = resposta;
    respostaElement.classList.add('resposta');
    respostaElement.setAttribute('id', `resposta-${index}`);
    modalContent.appendChild(respostaElement);
  });

  modal.style.display = 'block';

  closeButton.addEventListener('click', closeModal);

  function closeModal() {
    modal.style.display = 'none';
    closeButton.removeEventListener('click', closeModal);
  }


  sendInput.addEventListener('click', () => {
    const resposta = respostaInput.value.trim();

    if (!resposta) {
      alert("Campo preenchido incorretamente!");
      return;
    }

    sendAnswer(perguntaId, titulo, questao, respostasId, resposta, respostaCompleta)
  });

}

let selectedQuestionId = null; 

function openModalReport(questionId) {
  if (selectedQuestionId === questionId) {
    return;
  }

  selectedQuestionId = questionId;

  console.log(selectedQuestionId);

  let modalReport = document.getElementById("modal-reportar");
  let modalContent = document.createElement("div");
  modalContent.classList.add("report-container");

  structureReport = `
    <div class="title-report">
      <h3>Por favor, selecione uma...</h3>
      <span class="modal-close">&times;</span>
    </div> 
    <form method="post" action="#">
      <ul>
        <li>
          <input type="radio" id="violenciaAbusoExploracao" name="reportar" value="violenciaAbusoExploracao">
          <label for="violenciaAbusoExploracao">Violência, abuso e exploração criminal</label>
        </li>
        <li>
          <input type="radio" id="odioAssedio" name="reportar" value="odioAssedio">
          <label for="odioAssedio">Ódio e assédio</label>
        </li>
        <li>
          <input type="radio" id="conteudoSexual" name="reportar" value="conteudoSexual">
          <label for="conteudoSexual">Conteúdo sexual</label>
        </li>
        <li>
          <input type="radio" id="informacoesIncorretas" name="reportar" value="informacoesIncorretas">
          <label for="informacoesIncorretas">Informações incorretas</label>
        </li>
        <li>
          <input type="radio" id="spam" name="reportar" value="spam">
          <label for="spam">Spam</label>
        </li>
        <li>
          <input type="radio" id="informacoesPessoais" name="reportar" value="informacoesPessoais">
          <label for="informacoesPessoais">Compartilhamento de informações pessoais</label>
        </li>
        <li>
          <input type="radio" id="outro" name="reportar" value="outro">
          <label for="outro">Outro</label>
        </li>
      </ul>
      <input type="submit" value="Enviar"/>
    </form>
  `;

  modalReport.style.display = "block";

  modalContent.innerHTML = structureReport;

  modalReport.appendChild(modalContent);

  const closeButton = modalContent.querySelector(".modal-close");
  closeButton.addEventListener("click", closeModal);

  
  function closeModal() {
    modalReport.style.display = "none";
    modalReport.innerHTML = "";
    selectedQuestionId = null;
    closeButton.removeEventListener("click", closeModal);
  }

}


let visibleModal = false;
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
    repostas: [],
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

      updateDataUser(user, dataUser);


      //toggleModal();

    })
    .catch(error => {
      alert('Erro ao enviar pergunta!');
    });
}

function fecharModal() {
  toggleModal();
}

function updateDataUser(user, dataUser) {
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
          .then(e => e.json())
          .then(e => {
            e.cadastro.map((item) => {
              if (item.email === user.email && item.senha === user.senha) {
                localStorage.setItem('user', JSON.stringify(item));
              }
            })
          })
      } else {
        console.error('Erro ao adicionar o livro');
      }
    })
}






function sendAnswer(idPergunta, titulo, questao, respostasId, resposta, respostaCompleta) {
  let userConfirmation = JSON.parse(localStorage.getItem('user'));
  const ultimoNumero = respostasId[respostasId.length - 1] == null ? 0 : respostasId[respostasId.length - 1];

  const data = {
    id: idPergunta,
    title: titulo,
    question: questao,
    respostas: [...respostaCompleta,
    {
      id: ultimoNumero + 1,
      resposta: resposta
    }
    ]
  }

  fetch(`http://localhost:3000/perguntas/${idPergunta}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        console.log('Livro adicionado com sucesso');
        fetch('../api/db.json')
          .then(e => e.json())
          .then(e => {
            e.cadastro.map((item) => {
              if (item.email === userConfirmation.email && item.senha === userConfirmation.senha) {
                localStorage.setItem('user', JSON.stringify(item));
              }
            })

          })
      } else {
        console.error('Erro ao adicionar o livro');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
}


