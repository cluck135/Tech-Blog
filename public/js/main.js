const loadHomePage = async () => {
    await document.location.replace('/');
};  

const loadDashboard = async () => {
    event.preventDefault();

      const response = await fetch(`/dashboard/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard/`);
      } else {
        alert('Failed to load post');
      }
};

document.querySelector('#home').addEventListener('click', loadHomePage);
document.querySelector('#dashboard').addEventListener('click', loadDashboard);
