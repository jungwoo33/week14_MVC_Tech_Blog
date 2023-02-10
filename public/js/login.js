const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // this will call:
    //    controllers/api/user-routes.js
    // then, find the post route: "router.post('/login', async (req, res) => {"
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response.body);

    // if successfully logged-in, send to: localhost:3001/dashboard
    if (response.ok) {
      /*
      console.log('==============================================================');
      console.log('I am sending you to: /dashboard')
      */

      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
