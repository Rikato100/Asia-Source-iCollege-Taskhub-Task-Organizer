document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  // Redirect to appropriate dashboard
  const accountType = localStorage.getItem('accountType');
  if (accountType === 'teacher' && !window.location.pathname.includes('teacher-')) {
    window.location.href = 'teacher-dashboard.html';
    return;
  } else if (accountType === 'student' && window.location.pathname.includes('teacher-')) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.parentElement.classList.add('active');
    }
  });
});