const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const name = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/add', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to signup in');
      }
    }
  };

const loginPageHandler = async (event) => {
    event.preventDefault();

        const response = await fetch(`/login`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace(`/login`);
        } else {
        alert('Failed to load login page');
        }
    };

  
document
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler)

document
.querySelector('.login')
.addEventListener('click', loginPageHandler)