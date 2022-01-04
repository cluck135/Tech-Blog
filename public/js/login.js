const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const user = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (user && password) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

const signupPageHandler = async (event) => {
  event.preventDefault();

    const response = await fetch(`/signup`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/signup`);
    } else {
      alert('Failed to load signup page');
    }
  };


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup')
  .addEventListener('click', signupPageHandler);
