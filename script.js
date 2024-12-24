const API_BASE = 'https://jsonplaceholder.typicode.com';

const usersList = document.getElementById('users-list');
const commentsSection = document.getElementById('comments-section');
const commentsList = document.getElementById('comments-list');
const backButton = document.getElementById('back-button');

async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE}/users`);
    const users = await response.json();

    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.textContent = user.name;
      userItem.dataset.userId = user.id;
      userItem.addEventListener('click', () => fetchComments(user.id));
      usersList.appendChild(userItem);
    });
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}

async function fetchComments(userId) {
  try {
    usersList.style.display = 'none';
    commentsSection.style.display = 'block';

    commentsList.innerHTML = '';

    const response = await fetch(`${API_BASE}/comments`);
    const comments = await response.json();

    const userComments = comments.slice(0, 15).filter(comment => comment.postId === userId);

    userComments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
      commentsList.appendChild(commentItem);
    });
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
  }
}

backButton.addEventListener('click', () => {
  commentsSection.style.display = 'none';
  usersList.style.display = 'block';
});

fetchUsers();
