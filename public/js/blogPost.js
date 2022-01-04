const viewCommentHandler = async (event) => {
    event.preventDefault();
    const commentId = event.currentTarget.dataset.id;
    const currentPath = document.location.pathname;

      const response = await fetch(`${currentPath}/comment/${commentId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`${currentPath}/comment/${commentId}`);
      } else {
        alert('Failed to load ppst');
      }
    };

const addCommentHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const content = document.querySelector('#comment-content').value.trim();
  const user_id = document.querySelector('.blog-post').dataset.id;
  const post_id = document.querySelector('.comment-form').dataset.id;
  if ( content && post_id && user_id ) {
    // Send the e-mail and password to the server
    const response = await fetch('/api/comments/add', {
      method: 'POST',
      body: JSON.stringify({ content, post_id, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blogPost/${post_id}`);
    } else {
      alert('Failed to post');
    }
  }
};
    
document
  .querySelector('.add-comment')
  .addEventListener('click', addCommentHandler);

let comment = document.querySelectorAll('.post-comment');
comment.forEach(function(item){
    item.addEventListener('click', viewCommentHandler)
});

