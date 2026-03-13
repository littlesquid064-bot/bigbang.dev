import {
  useState,
  useEffect
} from 'react';
import mockRecipes from '../data/mockRecipes';
import RecipeCard from '../components/RecipeCard';
import Modal from '../components/Modal';
import {
  useAuth
} from '../context/AuthContext';

// Helper function for date formatting
const formatDateInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const RecipesPage = ({
  favorites,
  toggleFavorite,
  addRecipeToMealPlan
}) => {
  const {
    currentUser
  } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
  const [selectedRecipeForMealPlan, setSelectedRecipeForMealPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDateInput(new Date()));

  useEffect(() => {
    let tempRecipes = [...mockRecipes];

    if (searchTerm) {
      tempRecipes = tempRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (cuisineFilter) {
      tempRecipes = tempRecipes.filter(recipe =>
        recipe.cuisine.toLowerCase() === cuisineFilter.toLowerCase()
      );
    }

    if (dietaryFilter) {
      tempRecipes = tempRecipes.filter(recipe =>
        recipe.dietary.some(diet =>
          diet.toLowerCase().includes(dietaryFilter.toLowerCase())
        )
      );
    }

    if (maxPrepTime) {
      tempRecipes = tempRecipes.filter(recipe => {
        const timeValue = parseInt(recipe.prepTime.split(' ')[0]);
        return timeValue <= parseInt(maxPrepTime);
      });
    }

    if (maxCookTime) {
      tempRecipes = tempRecipes.filter(recipe => {
        const timeValue = parseInt(recipe.cookTime.split(' ')[0]);
        return timeValue <= parseInt(maxCookTime);
      });
    }

    setFilteredRecipes(tempRecipes);
  }, [searchTerm, cuisineFilter, dietaryFilter, maxPrepTime, maxCookTime]);

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

  const cuisines = [...new Set(mockRecipes.map(r => r.cuisine))];
  const dietaryOptions = [...new Set(mockRecipes.flatMap(r => r.dietary))];

  return (
    <div className="container">
      <h1 className="page-header">All Recipes</h1>

      <div className="filters-container">
        <div className="form-group search-bar">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="By title, ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="form-group filter-group">
          <label htmlFor="cuisine">Cuisine</label>
          <select
            id="cuisine"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
          >
            <option value="">All</option>
            {cuisines.map(cuisine => (
              <option
                key={cuisine}
                value={cuisine}
              >
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group filter-group">
          <label htmlFor="dietary">Dietary</label>
          <select
            id="dietary"
            value={dietaryFilter}
            onChange={(e) => setDietaryFilter(e.target.value)}
          >
            <option value="">All</option>
            {dietaryOptions.map(diet => (
              <option
                key={diet}
                value={diet}
              >
                {diet}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group filter-group">
          <label htmlFor="maxPrepTime">Max Prep (min)</label>
          <input
            type="number"
            id="maxPrepTime"
            value={maxPrepTime}
            onChange={(e) => setMaxPrepTime(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group filter-group">
          <label htmlFor="maxCookTime">Max Cook (min)</label>
          <input
            type="number"
            id="maxCookTime"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAddToFavorites={toggleFavorite}
              onAddToMealPlan={handleAddToMealPlanClick}
              isFavorite={favorites.includes(recipe.id)}
            />
          ))
        ) : (
          <p>No recipes found matching your criteria.</p>
        )}
      </div>

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

export default RecipesPage;
