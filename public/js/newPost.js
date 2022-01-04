const postFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();
  // Gather the data from the form elements on the page
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const user_id = document.querySelector('.post-form').dataset.id;
  if (title && content && user_id) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/posts/add', {
      method: 'POST',
      body: JSON.stringify({ title, content, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post');
    }
  }
};

  document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);