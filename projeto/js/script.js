fetch('livros.json')
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
            <h2>${title}</h2>
            <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <img src="${img}" alt="">
            <p>${overview}</p>
            <p>Estoque: ${estoq}</p>
            <p>Ano: ${data}</p>
          </div>
        `;
      
        modalContent.innerHTML = modalStructure;
      
        let modal = document.getElementById("modal");
        modal.style.display = "block";
        modal.innerHTML = ""; // Limpa o conteúdo anterior
        modal.appendChild(modalContent);
      
        // Fecha o modal quando o usuário clica no botão de fechar
        let closeButton = modalContent.querySelector(".close");
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
            modal.innerHTML = ""; // Limpa o conteúdo do modal ao fechar
        });
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
                    <p>${estoq}</p>
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

    e.map(add_card)
})