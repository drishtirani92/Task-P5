import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import { loginSchema, getFieldErrors } from '../utils/validation.js';
import { loginUser, describeError } from '../services/userService.js';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      setErrors(getFieldErrors(result.error));
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      const user = await loginUser(result.data);
      sessionStorage.setItem('devdeakin_user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      if (err.message === 'INVALID_CREDENTIALS') {
        setFormError(
          'Incorrect email or password. Please try again, or sign up for a free account.',
        );
      } else {
        setFormError(describeError(err));
      }
    }
    setLoading(false);
  };

  return (
    <section className="form-page">
      <h1>Login</h1>

      {location.state?.registered && (
        <p className="success">Account created! Please log in.</p>
      )}
      {formError && <p className="error">{formError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}

export default Login;
