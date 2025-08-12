/**
 * Authentication Module for TaskHub
 * Handles both student and teacher authentication
 */

// Global logout function
window.logout = function() {
  localStorage.clear(); // Clear all stored data
  window.location.href = 'login.html';
  return false; // Prevent default behavior
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Password toggle functionality
  const showPassword = document.getElementById('showPassword');
  const passwordInput = document.getElementById('password');
  
  if (showPassword && passwordInput) {
      showPassword.addEventListener('change', function() {
          passwordInput.type = this.checked ? 'text' : 'password';
      });
  }

  // Login form handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;
          const errorElement = document.getElementById('errorMessage');

          // Clear previous errors
          if (errorElement) errorElement.style.display = 'none';

          /* VALID CREDENTIALS */
          const validCredentials = {
              // Student account
              'marcosjaiper@asiasourceicollege.edu.ph': {
                  password: '123456',
                  accountType: 'student',
                  redirect: 'dashboard.html'
              },
              // Teacher account
              'maamella@gmail.com': {
                  password: '123456',
                  accountType: 'teacher',
                  redirect: 'teacher-dashboard.html'
              }
          };

          // Check credentials
          if (validCredentials[email] && validCredentials[email].password === password) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('accountType', validCredentials[email].accountType);
              localStorage.setItem('userEmail', email);
              window.location.href = validCredentials[email].redirect;
          } else {
              // Show error
              if (errorElement) {
                  errorElement.textContent = 'Invalid email or password';
                  errorElement.style.display = 'block';
              } else {
                  alert('Invalid email or password');
              }
          }
      });
  }

  // Auto-attach logout handlers
  document.querySelectorAll('.logout-btn').forEach(button => {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          logout();
      });
  });

  // Clear credentials when visiting login page
  if (window.location.pathname.endsWith('login.html')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('accountType');
      localStorage.removeItem('userEmail');
  }
});