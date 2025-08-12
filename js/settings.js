function toggleSection(sectionId) {
  const section = document.getElementById(`${sectionId}-section`);
  const icon = section.previousElementSibling.querySelector('.toggle-icon');
  
  section.classList.toggle('active');
  icon.textContent = section.classList.contains('active') ? '-' : '+';
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize - close all sections by default
  document.querySelectorAll('.section-content').forEach(section => {
    section.classList.remove('active');
  });

  // Password change and logout logic remains same
  document.getElementById('changePasswordBtn')?.addEventListener('click', function() {
    // ... existing password change logic
  });

  document.getElementById('logoutBtn')?.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });
});