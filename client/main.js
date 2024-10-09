const postForm = document.getElementById('post-form');
const displayPost = document.getElementById('display-post');

postForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission/refresh

    // Get values from the form fields
    const postTitle = document.getElementById('post').value;
    const postDescription = document.getElementById('description').value;

    // Create a new post object to send via Axios
    const postData = {
        title: postTitle,
        description: postDescription
    };

    // Send data using Axios to the backend (assuming a /api/posts endpoint)
    axios.post('http://localhost:3000/add_data', postData)
        .then(response => {
            
            const newPost = response.data.data; // Get the created post data with ID
            console.log('coming response after by response.data',response.data);
            console.log('coming response after by response.data.data[id]',response.data.data['id']);

            // Display the new post on the page
            displayPost.innerHTML += `
                <div class="post-item" data-id="${newPost.id}">
                    <h3>
                    <img src=" ${newPost.image}" alt=" ${newPost.id} not available" width ="300" height = "500" >
                   </h3>
                    <p>
                        ${newPost.desc}
                    </p>

                    <div class="comment-section">
                        <input type="text" class="comment-input" placeholder="Add a comment...">
                        <button class="add-comment-btn">Comment</button>
                    </div>
                    <div class="comments-display"></div>
                </div>
            `;

            // Clear form fields
            postForm.reset();
        })
        .catch(error => {
            console.error('Error creating post:', error);
        });
});

// Event delegation to handle comment submissions
displayPost.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-comment-btn')) {
        const postItem = event.target.closest('.post-item');
        const commentInput = postItem.querySelector('.comment-input');
        const commentsDisplay = postItem.querySelector('.comments-display');
        const postId = postItem.getAttribute('data-id');

        if (commentInput.value.trim() !== '') {
            // Prepare the comment data
            const commentData = { text: commentInput.value };

            // Send comment to backend using Axios (assuming a /api/posts/:id/comments endpoint)
            axios.post(`http://localhost:3000/add_comment/${postId}`, commentData)
                .then(response => {
                    const newComment = response.data.data; // Get the new comment data
                    // console.log('coming response coomensts',newComment);
                    // console.log('coming ----',newComment[0]?.content);
                    commentsDisplay.innerHTML += "";
                    if (Array.isArray(newComment)) {
                        console.log('this is array');
                        newComment.forEach(data =>{
                            commentsDisplay.innerHTML += `<h6>${data.content}</h6> `
                        });

                    }
                    // // Display the new comment below the post
                    // commentsDisplay.innerHTML += `<p>Comment: ${newComment.text.content}</p>`;

                    // Clear the comment input field
                    commentInput.value = '';
                })
                .catch(error => {
                    console.error('Error adding comment:', error);
                });
        }
    }
});



// display data
axios.get('http://localhost:3000/getdata')
.then(response => {
    console.log('coming response',response.data);
    
    const newPost = response.data.data; // Get the created post data with ID
    displayPost.innerHTML = ''
    // Display the new post on the page
    if (Array.isArray(newPost)) {
        newPost.forEach(data =>{
            displayPost.innerHTML += `
                <div class="post-item" data-id="${data.id}">
                    <h3>
                    <img src=" ${data.image}" alt=" ${data.id} not available" width ="300" height = "500" >
                   </h3>
                    <p>
                        ${data.desc}
                    </p>
                    <div class="comment-section">
                        <input type="text" class="comment-input" placeholder="Add a comment...">
                        <button class="add-comment-btn">Comment</button>
                    </div>
                    <div class="comments-display"></div>
                </div>
            `;

        })
    } 
    
        

})
.catch(error => {
    console.error('Error fetching post:', error);
});

