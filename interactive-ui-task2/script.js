// ===== Load Navbar and Footer =====
fetch('components/navbar.html')
  .then(res => res.text())
  .then(data => document.getElementById('navbar').innerHTML = data);

fetch('components/footer.html')
  .then(res => res.text())
  .then(data => document.getElementById('footer').innerHTML = data);

// ===== Show / Hide Password (Register) =====
document.addEventListener('click', function(e) {
  if (e.target.id === 'togglePassword') {
    const password = document.getElementById('password');
    e.target.classList.toggle('bi-eye-slash');
    password.type = password.type === 'password' ? 'text' : 'password';
  }

  if (e.target.id === 'toggleLoginPassword') {
    const loginPass = document.getElementById('loginPassword');
    e.target.classList.toggle('bi-eye-slash');
    loginPass.type = loginPass.type === 'password' ? 'text' : 'password';
  }
});

// ===== Password Match Check =====
const confirmPassword = document.getElementById('confirmPassword');
if (confirmPassword) {
  confirmPassword.addEventListener('keyup', function() {
    const pass = document.getElementById('password').value;
    const confirm = this.value;
    const msg = document.getElementById('passMsg');
    msg.textContent = pass !== confirm ? 'Passwords do not match!' : '';
  });
}

// ===== Dummy Form Submit =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Registration successful! (Frontend only)');
  });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Login successful! (Frontend only)');
  });
}

// ===== AJAX: Check Username & Email Availability =====
const usernameInput = document.getElementById('username');
if (usernameInput) {
  usernameInput.addEventListener('blur', function() {
    const username = this.value.trim();
    if (username === '') return;

    fetch('check_user.php?username=' + username)
      .then(response => response.text())
      .then(data => document.getElementById('userMsg').textContent = data);
  });
}

const emailInput = document.getElementById('email');
if (emailInput) {
  emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email === '') return;

    fetch('check_user.php?email=' + email)
      .then(response => response.text())
      .then(data => document.getElementById('emailMsg').textContent = data);
  });
}
