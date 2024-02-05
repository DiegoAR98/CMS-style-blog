// Function to handle post updates
async function handlePostUpdate(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Extract title, content, and post ID from the form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const postId = document.querySelector('#postid').dataset.id; // Using .dataset.id for clarity
  
    // Only proceed if all fields are filled
    if (title && content && postId) {
      try {
        const response = await fetch(`/api/posts/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, postId }),
        });
  
        // Redirect to dashboard if update is successful
        if (response.ok) {
          window.location.href = '/dashboard';
        } else {
          throw new Error('Post update failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    }
  }
  
  // Attach the event listener to the update button
  document.querySelector('#updateBtn').addEventListener('click', handlePostUpdate);
  
  // Function to handle post deletions
  async function handlePostDeletion(event) {
    // Check if the clicked element has a data-id attribute
    if (event.target.dataset.id) {
      const postId = event.target.dataset.id;
  
      try {
        const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
  
        // Redirect to dashboard if deletion is successful
        if (response.ok) {
          window.location.href = '/dashboard';
        } else {
          throw new Error('Failed to delete post.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    }
  }
  
  // Attach the event listener to the delete button
  document.querySelector('#deleteBtn').addEventListener('click', handlePostDeletion);
  