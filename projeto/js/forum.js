document.addEventListener('DOMContentLoaded', function() {
    let loggedIn = localStorage.getItem('loggedIn');
  
    if (loggedIn !== 'true') {
      window.location.href = 'login.html';
    }
});