import {
  useState
} from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useAuth
} from '../context/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const {
    register
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (register(email, password)) {
      alert('Registration successful! You are now logged in.');
      navigate('/profile');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register for Recipe Hub</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{
          color: 'var(--primary-color)',
          marginBottom: 'var(--spacing-md)',
          textAlign: 'center'
        }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="button button-primary"
          style={{
            width: '100%',
            marginTop: 'var(--spacing-md)'
          }}
        >
          Register
        </button>
      </form>
      <p style={{
        textAlign: 'center',
        marginTop: 'var(--spacing-lg)'
      }}>
        Already have an account?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
