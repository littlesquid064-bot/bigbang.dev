import {
  useParams,
  useNavigate
} from 'react-router-dom';
import mockRecipes from '../data/mockRecipes';
import {
  Heart,
  CalendarDays,
  Clock,
  Users,
  Utensils,
  BookOpen
} from 'lucide-react';
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

const RecipeDetailPage = ({
  favorites,
  toggleFavorite,
  addRecipeToMealPlan
}) => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    currentUser
  } = useAuth();
  const recipe = mockRecipes.find(r => r.id === id);

  const [isMealPlanModalOpen, setIsMealPlanModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(formatDateInput(new Date()));

  if (!recipe) {
    return (
      <div className="container page-header">
        <h2>Recipe Not Found</h2>
        <p>The recipe you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/recipes')}
          className="button button-primary"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  const handleAddToMealPlanClick = () => {
    if (!currentUser) {
      alert('Please log in to add recipes to your meal plan.');
      return;
    }
    setIsMealPlanModalOpen(true);
  };

  const handleConfirmAddToMealPlan = () => {
    if (selectedDate) {
      addRecipeToMealPlan(recipe.id, selectedDate);
      const displayDate = new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      alert(`Recipe added to meal plan for ${displayDate}!`);
      setIsMealPlanModalOpen(false);
      setSelectedDate(formatDateInput(new Date()));
    }
  };

  return (
    <div className="container">
      <div className="recipe-detail">
        <div className="recipe-detail-header">
          <h1 className="recipe-detail-title">{recipe.title}</h1>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-detail-image"
          />
        </div>

        <div className="recipe-detail-meta">
          <span>
            <Clock size={20} />
            Prep: {recipe.prepTime}
          </span>
          <span>
            <BookOpen size={20} />
            Cook: {recipe.cookTime}
          </span>
          <span>
            <Users size={20} />
            Servings: {recipe.servings}
          </span>
          <span>
            <Utensils size={20} />
            Cuisine: {recipe.cuisine}
          </span>
          {recipe.dietary && recipe.dietary.length > 0 && (
            <span>
              Dietary: {recipe.dietary.join(', ')}
            </span>
          )}
          <span>
            Rating: {recipe.rating} / 5
          </span>
        </div>

        <div className="recipe-detail-actions">
          <button
            className="button button-secondary"
            onClick={() => toggleFavorite(recipe.id)}
          >
            <Heart
              size={20}
              fill={isFavorite ? 'var(--primary-color)' : 'none'}
            />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button
            className="button button-primary"
            onClick={handleAddToMealPlanClick}
          >
            <CalendarDays size={20} />
            Add to Meal Plan
          </button>
        </div>

        <div className="recipe-detail-content">
          <div className="recipe-detail-section">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-detail-section">
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isMealPlanModalOpen}
        onClose={() => setIsMealPlanModalOpen(false)}
        title="Add to Meal Plan"
      >
        <p>Select a date to add "{recipe.title}" to your meal plan:</p>
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

export default RecipeDetailPage;
