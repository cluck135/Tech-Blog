
const addPostButton = async (event)  => {
    event.preventDefault();

    const response = await fetch('/newPost', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    })

    if (response.ok) {
        document.location.replace('/newPost')
    } else {
        alert('Failed to open newpost page');
    }

} //add another function for clicking on a post that it renders an update page

const updatePostHandler = async (event)  => {
    event.preventDefault();

    const post_id = event.currentTarget.dataset.id

    const response = await fetch(`/updatePost/${post_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace(`/updatePost/${post_id}`)
    } else {
        alert('Failed to open newpost page');
    }
}
document.querySelector('.newPost').addEventListener('click', addPostButton)

let post = document.querySelectorAll('.updatePost');
post.forEach(function(item){
    item.addEventListener('click', updatePostHandler)
});