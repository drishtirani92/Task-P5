import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import QuestionForm from '../components/QuestionForm.jsx';
import ArticleForm from '../components/ArticleForm.jsx';
import { validatePost } from '../utils/postValidation.js';

const emptyForm = {
  title: '',
  description: '',
  abstract: '',
  articleText: '',
  tags: '',
};

function Post() {
  const [postType, setPostType] = useState('question');
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = 'New Post | DEV@Deakin';
  }, []);

  // old error messages should not follow you to the other form
  useEffect(() => {
    setErrors({});
  }, [postType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validatePost(postType, form);
    setErrors(result.errors);

    if (!result.ok) {
      Swal.fire(
        'Error',
        'Your post could not be sent. Please fix the highlighted fields.',
        'error',
      );
      return;
    }

    // Saving the post comes in a later task
    Swal.fire('Post sent', 'Your post has been sent.', 'success');
    setForm(emptyForm);
  };

  return (
    <section className="form-page post-page">
      <h1>New Post</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="post-type">
          <span>Select Post Type:</span>
          <label>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === 'question'}
              onChange={(e) => setPostType(e.target.value)}
            />
            Question
          </label>
          <label>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === 'article'}
              onChange={(e) => setPostType(e.target.value)}
            />
            Article
          </label>
        </div>

        {postType === 'question' ? (
          <QuestionForm form={form} errors={errors} onChange={handleChange} />
        ) : (
          <ArticleForm form={form} errors={errors} onChange={handleChange} />
        )}

        <button type="submit" className="btn post-btn">
          Post
        </button>
      </form>
    </section>
  );
}

export default Post;
