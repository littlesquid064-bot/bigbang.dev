import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useAuth
} from '../context/AuthContext';
import mockRecipes from '../data/mockRecipes';

const ProfilePage = ({
  favorites,
  namedMealPlans,
  loadNamedMealPlan
}) => {
  const {
    currentUser,
    logout
  } = useAuth();
  const navigate = useNavigate();

  const favoriteRecipes = mockRecipes.filter(recipe => favorites.includes(recipe.id));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoadPlan = (planName) => {
    loadNamedMealPlan(planName);
    navigate('/meal-plan');
  };

  if (!currentUser) {
    return (
      <div className="container page-header">
        <h2>Your Profile</h2>
        <p>Please log in to view your profile.</p>
        <Link
          to="/login"
          className="button button-primary"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container profile-container">
      <div className="profile-header">
        <h2>Welcome, {currentUser.name || currentUser.email}!</h2>
        <p>Manage your culinary journey.</p>
      </div>

      <section className="profile-section">
        <h3>My Favorites</h3>
        {favoriteRecipes.length > 0 ? (
          <ul className="profile-list">
            {favoriteRecipes.slice(0, 3).map(recipe => (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </li>
            ))}
            {favoriteRecipes.length > 3 && (
              <li>
                <Link to="/favorites">View all {favoriteRecipes.length} favorites</Link>
              </li>
            )}
          </ul>
        ) : (
          <p>You have no favorite recipes yet. <Link to="/recipes">Start adding some!</Link></p>
        )}
      </section>

      <section className="profile-section">
        <h3>My Saved Meal Plans</h3>
        {namedMealPlans.length > 0 ? (
          <ul className="profile-list">
            {namedMealPlans.map(planName => (
              <li key={planName}>
                <span>{planName}</span>
                <button
                  onClick={() => handleLoadPlan(planName)}
                  className="button button-secondary"
                  style={{
                    fontSize: '0.9rem',
                    padding: 'var(--spacing-xs) var(--spacing-md)'
                  }}
                >
                  Load Plan
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't saved any meal plans yet. <Link to="/meal-plan">Create one!</Link></p>
        )}
      </section>

      <div style={{
        textAlign: 'center',
        marginTop: 'var(--spacing-xxl)'
      }}>
        <button
          onClick={handleLogout}
          className="button button-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
