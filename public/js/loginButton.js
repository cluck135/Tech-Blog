const loadLoginPage = async () => {
    await document.location.replace('/login');
  };

document.querySelector('#login').addEventListener('click', loadLoginPage);