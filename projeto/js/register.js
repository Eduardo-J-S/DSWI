$(document).ready(function() {
    $('#telefone').inputmask('(99) 99999-9999');
});

let info = document.getElementById('info')
const form = document.getElementById('cadastro-form');
const senhaInput = document.getElementById('senha');
const cadastrarButton = document.getElementById('btn-cadastrar');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    //url da requisição
    const url = 'http://localhost:3000/cadastro/';

    // Pega os valores dos inputs
    const nome = document.getElementById('primeiro_nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    let erroContent = document.createElement("div");

    estrutura = `<p class="erroSenha">Erro: As senhas são diferentes.</p>`

    if (senha !== confirmarSenha) {
        erroContent.innerHTML = estrutura

        error.appendChild(erroContent)
        console.error('Erro: A senha e a confirmação de senha não correspondem.');
        return;
    }

    // Cria um objeto com os valores
    const data = {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        meusLivros: [],
        minhasPerguntas: [],
    };

    // Realiza o POST usando fetch
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Usuário cadastrado com sucesso!', data);

            window.location.href = 'login.html';

        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
        });
});
  
function verifyPass(){

    info.style.display = 'block';

    let senha = senhaInput.value;
    let feeds = Array.from(document.getElementsByClassName("feed"));

    let maiuscula = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    let numeros = "0123456789";
    let especiais = "@#$%&!"; 

    let m = [];
    let n = [];
    let e = [];


    function estilo(f, s) {
        let es = ["#2fdc2f", "#ff383b"];
        feeds[f].style.color = es[s];
    }
    
    if(senha.length >= 8){
        estilo(0,0);
    } else {
        estilo(0, 1)
    }

    for (index = 0; index < senha.length; index++) {
       m.push(maiuscula.indexOf(senha.charAt(index)));
       let maxM = Math.max.apply(null, m);
       if(maxM>=0){
        estilo(1,0);
       } else {
        estilo(1,1);
       }

       n.push(numeros.indexOf(senha.charAt(index)));
       let maxN = Math.max.apply(null, n);
       if(maxN>=0){
        estilo(2,0);
       } else {
        estilo(2,1);
       }

       e.push(especiais.indexOf(senha.charAt(index)));
       let maxE = Math.max.apply(null, e);
       if(maxE>=0){
        estilo(3,0);
       } else {
        estilo(3,1);
       }
    }

    if (senha.length === 0) {
        estilo(0, 1);
    }

       // Verificar o estado das verificações e habilitar/desabilitar o botão de cadastro
    const allGreen = feeds.every((feed) => feed.style.color === 'rgb(47, 220, 47)');
    console.log(allGreen)
    cadastrarButton.disabled = !allGreen;
}