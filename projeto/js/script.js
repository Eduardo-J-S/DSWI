var header = document.getElementById('header');
var navigationHeader = document.getElementById('navigation_header');
var content = document.getElementById('content');
var showSidebar = false;


function toggleSidebar(){
    showSidebar = !showSidebar;
    if(showSidebar){
        navigationHeader.style.marginLeft = '-10vw';
        navigationHeader.style.animationName = 'showSidebar';
        content.style.filter = 'blur(2px)';
    } else{
        navigationHeader.style.marginLeft = '-100vw';
        navigationHeader.style.animationName = '';
        content.style.filter = '';
    }
}

function closeSidebar(){
    if(showSidebar){
        showSidebar = true;
        toggleSidebar();
    }
}

window.addEventListener('resize', function(event) {
    if(window.innerWidth > 768 && showSidebar) {
        showSidebar = true;
        toggleSidebar();
    }
})

fetch('livros.json')
.then(e=>e.json())
.then(e=>{
    function add_card(obj){
        let div = document.createElement("div")
    // let obj = e[4]
    let title = obj.titulo
    let img = obj.imgCapa
    let data = obj.ano
    let overview = obj.descricao
    let estoq = obj.estoque

    let estrutura = `<section>
         <div class="card_image">
             <img src="${img}" alt="">
         </div>
         <div class="card_body">
             <h4>${title}</h4>
             <div class="card_status">
                 <p class="badge">${overview}</p>
                 <p class="badge">
                     <img width="10" src="" alt="">
                     ${estoq}
                 </p>
                 <p>${data}</p>
             </div>
         </div>
     </section>
     `

     div.innerHTML = estrutura
     cards.appendChild(div)
    }

    e.map(add_card)
})
