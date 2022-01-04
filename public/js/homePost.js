const viewBlogPostHandler = async (event) => {
    event.preventDefault();
    const postId = event.currentTarget.dataset.id;

      const response = await fetch(`/blogPost/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/blogPost/${postId}`);
      } else {
        alert('Failed to load post');
      }
    };
  
let post = document.querySelectorAll('.blog-post');
post.forEach(function(item){
    item.addEventListener('click', viewBlogPostHandler)
});