const updatePostFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const post_id = document.querySelector('.update-post-form').dataset.id;
    if (title && content && post_id) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/posts/updatePost', {
        method: 'PUT',
        body: JSON.stringify({ title, content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update');
      }
    }
  };

  const deletePostHandler = async (event) => {
    event.preventDefault();
    const post_id = document.querySelector('.update-post-form').dataset.id;

    const response = await fetch('/api/posts/deletePost', {
      method: 'DELETE',
      body: JSON.stringify({ post_id }),
      headers: { 'Content-Type': 'application/json'}
    })

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete');
    }
  }

  document
  .querySelector('.updatePost')
  .addEventListener('click', updatePostFormHandler);

  document
  .querySelector('.delete-post')
  .addEventListener('click', deletePostHandler);
