document.addEventListener('DOMContentLoaded', function () {
    // Obtém os dados do usuário do localStorage
    let loggedIn = localStorage.getItem('loggedIn');
    let letraNome = localStorage.getItem('letraNome');
    let user = JSON.parse(localStorage.getItem('user'));

    if (window.location.pathname === '/pages/user.html') {
        fetch('../api/db.json')
            .then(e => e.json())
            .then(e => {
                const user = JSON.parse(localStorage.getItem('user'));
                const myBooksIds = user.meusLivros || [];

                let bookList = document.getElementById('my-books');

                console.log('livros antes do metodo')
                // Função para adicionar um livro à lista
                function addBookToMyList(livro) {
                    console.log('livros dentro do metodo')
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

                    bookList.appendChild(bookItem);
                }

                e.livros.forEach(livro => {
                    if (myBooksIds.includes(livro.id)) {
                        console.log('livros q estão no array de meusLivros')
                        addBookToMyList(livro);
                    }
                });
            })
    } else if (window.location.pathname === '/pages/minhasPerguntas.html') {
        fetch('../api/db.json')
        .then(e => e.json())
        .then(e => {
            let questionList = document.getElementById('my-question');

            function addQuestionsProfile(livro) {

                let divPergunta = document.createElement('div');
                divPergunta.classList.add('pergunta');

                let titulo = document.createElement('h3');
                titulo.textContent = livro.title;
                divPergunta.appendChild(titulo);

                let descricao = document.createElement('p');
                descricao.textContent = livro.question;
                divPergunta.appendChild(descricao);

                const iconComment = document.createElement('i');
                iconComment.classList.add('fas', 'fa-comment');
                descricao.appendChild(iconComment);

                const iconEdit = document.createElement('i');
                iconEdit.classList.add('fas', 'fa-edit');
                descricao.appendChild(iconEdit);

                // Adicionar ícone de deletar
                const iconDelete = document.createElement('i');
                iconDelete.classList.add('fas', 'fa-trash');
                descricao.appendChild(iconDelete);

                questionList.appendChild(divPergunta);
            }

            const user = JSON.parse(localStorage.getItem('user'));

            e.perguntas.forEach(livro => {
                if (user.minhasPerguntas.includes(livro.id)) {
                    addQuestionsProfile(livro);
                }
            });
        })
    }

    // Verifica se o usuário está logado
    if (loggedIn === 'true') {
        // Preenche o ícone de perfil com a letra inicial do nome
        let profileIcon = document.getElementById('profile-icon');
        profileIcon.textContent = letraNome;

        let profileName = document.getElementById('profile-name');
        profileName.textContent = user.nome;

        let profileEmail = document.getElementById('profile-email');
        profileEmail.textContent = user.email;
    } else {
        window.location.href = 'home.html';
    }

})