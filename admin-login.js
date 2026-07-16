document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const errorMsg = document.getElementById('error-msg');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Hash password to avoid plaintext in code
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Simple client-side auth
      if (email === 'helenachn@yahoo.com' && hashHex === 'be991096d386adb5bf7ad81908ff3c34d041877f154125f5e6418dd89ce7d563') {
        sessionStorage.setItem('isAdmin', 'true');
        window.location.href = 'admin-dashboard.html';
      } else {
        errorMsg.style.display = 'block';
      }
    });
  }

  // Reveal page
  document.body.classList.add('loaded');
});
