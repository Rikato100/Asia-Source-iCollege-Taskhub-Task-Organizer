document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'login.html';
      return;
    }
  
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.parentElement.classList.toggle(
        'active', 
        link.getAttribute('href') === currentPage
      );
    });
  });