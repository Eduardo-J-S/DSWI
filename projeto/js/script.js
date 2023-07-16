const apiKey = 'AIzaSyAXABYuyh6gvxbydmxfB-sckgUrUzbHtP8';
let query;

function updateQuery(title) {
    query = title;
    fetchBooks();
}

function fetchBooks() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        const items = data.items;
        const comprar = [];

        let contBooks = 0;

        
        items.forEach(item => {
            const title = item.volumeInfo.title;

            // Verificar se o título do livro corresponde à consulta
            if (title === query) {
                if (item.saleInfo.saleability === 'FOR_SALE') {

                    let obj = {
                        buyLink: item.saleInfo.buyLink,
                        listPrice: item.saleInfo.listPrice.amount,
                        currencyCode: item.saleInfo.listPrice.currencyCode
                    }

                    comprar.push(obj)
                    
                    contBooks++;
                }
            } 
        });

        if (contBooks === 0) {
            let estruturaResults = `<p class="preco__venda">Nenhum resultado encontrado</p>`;
          
            let divResults = document.createElement("div");
            divResults.innerHTML = estruturaResults;
            results.appendChild(divResults);
          } else {
            comprar.map((call) => {
              let estruturaResults = `
                <p class="preco__venda">Preço de venda: ${call.listPrice} ${call.currencyCode}</p>
                <div class="local__venda">
                  <a href="${call.buyLink}" target="_blank">Clique aqui para acessar o site</a>
                </div>
              `;
          
              let divResults = document.createElement("div");
              divResults.innerHTML = estruturaResults;
              results.appendChild(divResults);
            });
          }
          
        
    })
    .catch(error => {
        console.error(error);
    });
}


fetch('../api/db.json')
.then(e=>e.json())
.then(e=>{

    function showModal(obj) {
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
      
        let title = obj.titulo;
        let img = obj.imgCapa;
        let data = obj.ano;
        let overview = obj.descricao;
        let estoq = obj.estoque;
      
        let modalStructure = `
          <div class="modal-header">
            <h2 class="data-title">${title}</h2>
            <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <img src="${img}" alt="">
            <p>${overview}</p>
            <p>Ano: ${data}</p>
            <div>
                <ul class="input__modal">
                    <li class="input__box__modal">
                        <p>Clique em "Pesquisar" para ver o preço e comprar pelo google</p>
                        <input type="text" name="pesquisar" id="bookName" value="${title}" readonly />
                        <button id="searchButton">Pesquisar</button>
                    </li>
                </ul>
            </div>
            <div id="results"></div>
          </div>
        `;

        let clickCount = 0;

        const buttonModal = document.getElementById('modal');
        buttonModal.addEventListener('click', function(event) {
        if (event.target.matches('#searchButton')) {
            if (clickCount === 0) {
                const bookName = document.getElementById('bookName').value;
          
                if (bookName) {
                  updateQuery(bookName);
                }
      
                clickCount++;
              }
            }
        });
        
        modalContent.innerHTML = modalStructure;

       
        let modal = document.getElementById("modal");
        modal.style.display = "block";
        modal.innerHTML = ""; 
        modal.appendChild(modalContent);
      
        // Fecha o modal quando o usuário clica no botão de fechar
        let closeButton = modalContent.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
            modal.innerHTML = ""; 
        });



        


        const user = JSON.parse(localStorage.getItem('user')); 
        let loggedIn = localStorage.getItem('loggedIn');

        if (loggedIn === 'true') {
            let plusButtons = modalContent.querySelectorAll(".data-title");
            plusButtons.forEach((button) => {
                let plusButton = document.createElement("button");
                plusButton.innerHTML = "+";
                plusButton.classList.add("add-button");
                button.appendChild(plusButton);

                const idLivro = obj.id
                
                if (user.meusLivros.includes(idLivro)) {
                    plusButton.innerHTML = "-";
                }
                
                plusButton.addEventListener("click", () => {
                    
                    const currentPerguntas = user.minhasPerguntas;

                    const idLivro = obj.id;

                    const data = {
                        nome: user.nome,
                        email: user.email,
                        telefone: user.telefone,
                        senha: user.senha,
                        meusLivros: [],
                        minhasPerguntas: user.minhasPerguntas,
                        id: user.id
                    }

                    if (user.meusLivros.includes(idLivro)) {
                        data.meusLivros = user.meusLivros.filter((livroId) => livroId !== idLivro);
                    } else {
                        data.meusLivros = [...user.meusLivros, idLivro];
                    }

                    fetch(`http://localhost:3000/cadastro/${user.id}`, {
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
                    .catch(error => {
                        console.error('Erro na requisição:', error);
                    });
                });
            });
        }


    }
      
    function add_card(obj){
        
        let div = document.createElement("div")
        let title = obj.titulo
        let img = obj.imgCapa
        let data = obj.ano
        let estoq = obj.estoque

        let estrutura = `<section class="card">
            <div class="card_image" id="card-image">
                <img src="${img}" alt="">
            </div>
            <div class="card-body">
                <h4>${title}</h4>
                <div class="card_status">
                    <p>${data}</p>
                </div>
            </div>
        </section>
        `

        div.innerHTML = estrutura


         div.addEventListener("click", ()=>{
            showModal(obj)
        })

        cards.appendChild(div)
    }

    e.livros.map(add_card)
})