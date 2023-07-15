document.addEventListener('DOMContentLoaded', function() {
    // Obtém os dados do usuário do localStorage
    let loggedIn = localStorage.getItem('loggedIn');
    let letraNome = localStorage.getItem('letraNome');
    let user = JSON.parse(localStorage.getItem('user'));

    // Verifica se o usuário está logado
    if (loggedIn === 'true') {
        // Preenche o ícone de perfil com a letra inicial do nome
        let profileIcon = document.getElementById('profile-icon');
        profileIcon.textContent = letraNome;

        // Preenche os detalhes do perfil
        let profileName = document.getElementById('profile-name');
        profileName.textContent = user.nome;

        let profileEmail = document.getElementById('profile-email');
        profileEmail.textContent = user.email;
    } else{
        window.location.href = 'home.html';
    }
})


fetch('../api/db.json')
.then(e=>e.json())
.then(e=>{
    let bookList = document.getElementById('my-books');

    // Função para adicionar um livro à lista
    function addBookToMyList(livro) {
        
        let bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        let bookImage = document.createElement('img');
        bookImage.src = livro.imgCapa;
        bookImage.alt = livro.titulo;
        bookItem.appendChild(bookImage);

        let bookTitle = document.createElement('h3');
        bookTitle.textContent = livro.titulo;
        bookItem.appendChild(bookTitle);

        let bookAuthor = document.createElement('p');
        bookAuthor.textContent = livro.autores.autor1;
        bookItem.appendChild(bookAuthor);

        // bookItem.appendChild(bookTitle);
        // bookItem.appendChild(bookImage);
        // bookItem.appendChild(bookAuthor);

                
        bookList.appendChild(bookItem);
    }

    const user = JSON.parse(localStorage.getItem('user')); 

    e.livros.map((livro) =>{
        user.meusLivros.forEach(element => {
            if(livro.id === element){
                addBookToMyList(livro);
            }
        });
        
    })
})

