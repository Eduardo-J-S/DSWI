const form = document.getElementById('cadastro-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userIcon = document.getElementById('userIcon');

    let erroContent = document.createElement("div");

    estrutura = `<p class="erroSenha">Usuário ou senha incorretos.</p>`

    erroContent.innerHTML = estrutura

    if (userIcon) {
        console.log('Entrou')
        userIcon.style.display = 'block';
      }

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('../api/db.json')
    .then(e=>e.json())
    .then(e=>{
        let cont = 0;
        e.cadastro.map((item)=>{
            if(item.email === email && item.senha === senha){
                cont++;
                const primeiraLetra = item.nome.charAt(0);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('letraNome', primeiraLetra)
                localStorage.setItem('user', JSON.stringify(item));
                return window.location.href = 'home.html';
            }
        })
        
        if(cont === 0){
            return error.appendChild(erroContent)
        }
    
    })
});