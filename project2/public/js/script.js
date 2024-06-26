// Example: Add event listener for delete buttons
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async (event) => {
        const postId = event.target.dataset.postId;
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`/delete/${postId}`, {
                    method: 'POST'
                });
                if (response.ok) {
                    window.location.reload(); // Reload the page after deletion
                } else {
                    console.error('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    });
});
