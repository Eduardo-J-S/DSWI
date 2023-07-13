$(document).ready(function() {
    $('#telefone').inputmask('(99) 99999-9999');
});

const form = document.getElementById('cadastro-form');

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

    console.log(nome);
    console.log(email);
    console.log(telefone);
    console.log(senha);
    console.log(confirmarSenha);

    let erroContent = document.createElement("div");

    estrutura = `<p class="erroSenha">Erro: As senhas não correspondem.</p>`

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
        senha: senha
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