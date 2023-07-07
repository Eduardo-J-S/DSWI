const form = document.getElementById('cadastro-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userIcon = document.getElementById('userIcon');

    if (userIcon) {
        console.log('Entrou')
        userIcon.style.display = 'block';
      }

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('../api/db.json')
    .then(e=>e.json())
    .then(e=>{
        e.cadastro.map((item)=>{
            if(item.email === email && item.senha === senha){
                localStorage.setItem('loggedIn', 'true');
                return window.location.href = 'home.html';
            }
        })

    })
});