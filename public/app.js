const API_BASE = '/api/v1';

const postsList = document.getElementById('posts-list');
const form = document.getElementById('post-form');
const formMessage = document.getElementById('form-message');
const generateAiBtn = document.getElementById('generate-ai');
const refreshPostsBtn = document.getElementById('refresh-posts');
const aiSummary = document.getElementById('ai-summary');
const aiKeywords = document.getElementById('ai-keywords');
const aiTone = document.getElementById('ai-tone');
const aiPreview = document.getElementById('ai-preview');

const setMessage = (text, type = '') => {
  formMessage.textContent = text;
  formMessage.className = `message ${type}`.trim();
};

const renderPosts = (posts) => {
  if (!posts || posts.length === 0) {
    postsList.innerHTML = '<p>No posts yet. Create one to get started.</p>';
    return;
  }

  postsList.innerHTML = posts.map((post) => `
    <article class="post-card">
      <h3>${post.title}</h3>
      <div class="meta">By ${post.author || 'guest'} • ${new Date(post.createdAt).toLocaleDateString()}</div>
      <p class="excerpt">${(post.summary || post.content || '').slice(0, 180)}${((post.summary || post.content || '').length > 180 ? '...' : '')}</p>
    </article>
  `).join('');
};

const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE}/posts`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Unable to load posts');
    }

    renderPosts(result.data || []);
  } catch (error) {
    postsList.innerHTML = `<p>Unable to load posts: ${error.message}</p>`;
  }
};

const generateAiInsights = async () => {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    setMessage('Please enter both a title and content before generating AI insights.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'AI generation failed');
    }

    aiSummary.textContent = result.data.summary || 'N/A';
    aiKeywords.textContent = (result.data.keywords || []).join(', ');
    aiTone.textContent = result.data.tone || 'neutral';
    aiPreview.classList.remove('hidden');
    setMessage('AI insights generated successfully.', 'success');
  } catch (error) {
    setMessage(error.message, 'error');
  }
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const author = document.getElementById('author').value.trim();

  if (!title || !content) {
    setMessage('Title and content are required.', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.errors ? result.errors.map((e) => e.msg).join(', ') : (result.message || 'Failed to create post'));
    }

    setMessage('Post created successfully.', 'success');
    form.reset();
    aiPreview.classList.add('hidden');
    await fetchPosts();
  } catch (error) {
    setMessage(error.message, 'error');
  }
});

generateAiBtn.addEventListener('click', generateAiInsights);
refreshPostsBtn.addEventListener('click', fetchPosts);

fetchPosts();
