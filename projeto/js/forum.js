document.addEventListener('DOMContentLoaded', function() {
    let loggedIn = localStorage.getItem('loggedIn');
  
    if (loggedIn === 'false') {
      window.location.href = 'login.html';
    }
});