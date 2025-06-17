document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const postContent = document.getElementById('postContent');
  const postsContainer = document.getElementById('postsContainer');

  const username = localStorage.getItem('username') || 'Anonymous';

  const loadPosts = () => {
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `<strong>${post.user}</strong>: ${post.content}`;
      postsContainer.appendChild(postEl);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = postContent.value.trim();
    if (!content) return;
    const posts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    posts.push({ user: username, content });
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    postContent.value = '';
    loadPosts();
  });

  loadPosts();
});
