document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login_form');
  const registerForm = document.querySelector('.register_form');

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const emailInput = loginForm.querySelector('#email');
      const passwordInput = loginForm.querySelector('#password');
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !emailInput.validity.valid || password.length < 12) {
        alert('メールアドレスまたはパスワードを確認してください。');
        return;
      }

      loginForm.reset();
      alert('デモサイトのためログイン情報は送信されません。');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const usernameInput = registerForm.querySelector('#username');
      const emailInput = registerForm.querySelector('#email');
      const passwordInput = registerForm.querySelector('#password');
      const confirmPasswordInput = registerForm.querySelector('#confirm_password');
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (
        username.length < 2 ||
        username.length > 40 ||
        !/^[^\s<>]{2,40}$/.test(username) ||
        !email ||
        !emailInput.validity.valid ||
        password.length < 12 ||
        password !== confirmPassword
      ) {
        alert('入力内容を確認してください。');
        return;
      }

      registerForm.reset();
      alert('デモサイトのため登録情報は送信されません。');
    });
  }
});
