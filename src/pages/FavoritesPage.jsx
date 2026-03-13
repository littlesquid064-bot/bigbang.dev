import {
  useState
} from 'react';
import {
  useAuth
} from '../context/AuthContext';
import mockRecipes from '../data/mockRecipes';
import RecipeCard from '../components/RecipeCard';
import {
  Link
} from 'react-router-dom';
import Modal from '../components/Modal';

// Helper function for date formatting
const formatDateInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const FavoritesPage = ({
  favorites,
  toggleFavorite,
  addRecipeToMealPlan
}) => {
  const {
    currentUser
  } = useAuth();

  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
  const [selectedRecipeForMealPlan, setSelectedRecipeForMealPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDateInput(new Date()));

  const favoriteRecipes = mockRecipes.filter(recipe => favorites.includes(recipe.id));

  const handleAddToMealPlanClick = (recipeId) => {
    if (!currentUser) {
      alert('Please log in to add recipes to your meal plan.');
      return;
    }
    setSelectedRecipeForMealPlan(recipeId);
    setIsMealPlanModalOpen(true);
  };

  const handleConfirmAddToMealPlan = () => {
    if (selectedRecipeForMealPlan && selectedDate) {
      addRecipeToMealPlan(selectedRecipeForMealPlan, selectedDate);
      const displayDate = new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      alert(`Recipe added to meal plan for ${displayDate}!`);
      setIsMealPlanModalOpen(false);
      setSelectedRecipeForMealPlan(null);
      setSelectedDate(formatDateInput(new Date()));
    }
  };


  if (!currentUser) {
    return (
      <div className="container page-header">
        <h2>Your Favorites</h2>
        <p>Please log in to view your favorite recipes.</p>
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
    <div className="container">
      <h1 className="page-header">Your Favorite Recipes</h1>

      {favoriteRecipes.length > 0 ? (
        <div className="favorites-grid recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAddToFavorites={toggleFavorite}
              onAddToMealPlan={handleAddToMealPlanClick}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="page-header">
          <p>You haven't saved any favorite recipes yet. <Link to="/recipes">Start adding some!</Link></p>
        </div>
      )}

      <Modal
        isOpen={isMealPlanModalOpen}
        onClose={() => setIsMealPlanModalOpen(false)}
        title="Add to Meal Plan"
      >
        <p>Select a date to add this recipe:</p>
        <div className="form-group">
          <label htmlFor="mealPlanDate">Date:</label>
          <input
            type="date"
            id="mealPlanDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          onClick={handleConfirmAddToMealPlan}
          className="button button-primary"
          style={{
            width: '100%',
            marginTop: 'var(--spacing-md)'
          }}
        >
          Add to Plan
        </button>
      </Modal>
    </div>
  );
};

export default FavoritesPage;
