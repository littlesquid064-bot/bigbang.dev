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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (login(email, password)) {
      navigate('/profile');
    } else {
      setError('Invalid email or password. Use test@example.com / password123');
    }
  };

  return (
    <div className="form-container">
      <h2>Login to Recipe Hub</h2>
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
        <button
          type="submit"
          className="button button-primary"
          style={{
            width: '100%',
            marginTop: 'var(--spacing-md)'
          }}
        >
          Login
        </button>
      </form>
      <p style={{
        textAlign: 'center',
        marginTop: 'var(--spacing-lg)'
      }}>
        Don't have an account?{' '}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
