document.addEventListener('DOMContentLoaded', function() {
  // Password toggle
  const showPassword = document.getElementById('showPassword');
  const passwordInput = document.getElementById('password');
  showPassword.addEventListener('change', () => {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
  });

  // Form submission
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('errorMessage');

    // Clear previous errors
    errorElement.style.display = 'none';

    // Validate credentials
    if (email === 'Student@asic.edu.ph' && password === 'studentasic11') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('accountType', 'student');
      window.location.href = 'dashboard.html';
    } 
    else if (email === 'Teacher@gmail.com' && password === 'teacherasic12') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('accountType', 'teacher');
      window.location.href = 'teacher-dashboard.html';
    }
    else {
      errorElement.textContent = 'Invalid email or password';
      errorElement.style.display = 'block';
    }
  });
});