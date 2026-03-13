import {
  Link
} from 'react-router-dom';
import {
  Search,
  BookText,
  User,
  Menu,
  Home,
  CalendarDays,
  Heart
} from 'lucide-react';
import {
  useAuth
} from '../context/AuthContext';
import {
  useState
} from 'react';

const Header = () => {
  const {
    currentUser,
    logout
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link
          to="/"
          className="header-logo"
        >
          <BookText size={28} />
          <span>Recipe Hub</span>
        </Link>
        <nav className="header-nav desktop-nav">
          <ul>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/meal-plan">Meal Plan</Link>
            </li>
            {currentUser && (
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search recipes..."
          />
        </div>
        {currentUser ? (
          <div
            className="user-avatar"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </div>
        ) : (
          <Link
            to="/login"
            className="button button-primary"
          >
            Login
          </Link>
        )}
        {isMenuOpen && (
          <div className="dropdown-menu">
            {currentUser && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={16} />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </>
            )}
            {!currentUser && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle - will need CSS for this to be visible only on mobile */}
      <button
        className="icon-button mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Navigation - will need CSS to hide on desktop */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/recipes"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookText size={18} />
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/meal-plan"
                onClick={() => setIsMenuOpen(false)}
              >
                <CalendarDays size={18} />
                Meal Plan
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} />
                  Favorites
                </Link>
              </li>
            )}
            {currentUser ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mobile-nav-button"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
