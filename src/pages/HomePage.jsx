import {
  Link
} from 'react-router-dom';
import mockRecipes from '../data/mockRecipes';
import RecipeCard from '../components/RecipeCard';
import {
  useAuth
} from '../context/AuthContext';
import {
  useState
} from 'react';
import Modal from '../components/Modal';

// Helper function for date formatting
const formatDateInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const HomePage = ({
  favorites,
  toggleFavorite,
  addRecipeToMealPlan
}) => {
  const {
    currentUser
  } = useAuth();
  const featuredRecipes = mockRecipes.slice(0, 3); // Show first 3 as featured

  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
  const [selectedRecipeForMealPlan, setSelectedRecipeForMealPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDateInput(new Date()));

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

  return (
    <div className="container">
      <section className="page-header">
        <h1>Welcome to Recipe Hub!</h1>
        <p>Discover, plan, and enjoy delicious meals.</p>
        <Link
          to="/recipes"
          className="button button-primary"
        >
          Explore Recipes
        </Link>
      </section>

      <section>
        <h2 className="page-header">Featured Recipes</h2>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAddToFavorites={toggleFavorite}
              onAddToMealPlan={handleAddToMealPlanClick}
              isFavorite={favorites.includes(recipe.id)}
            />
          ))}
        </div>
      </section>

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

export default HomePage;
