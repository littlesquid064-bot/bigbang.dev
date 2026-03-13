import {
  useState,
  useEffect
} from 'react';
import {
  useAuth
} from '../context/AuthContext';
import mockRecipes from '../data/mockRecipes';
import Modal from '../components/Modal';
import {
  Search,
  PlusCircle,
  Trash2
} from 'lucide-react';
import {
  Link
} from 'react-router-dom';

// Helper function to get dates for the current week (Sunday to Saturday)
const getWeekDays = (startDate = new Date()) => {
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startDate.getDate() - startDate.getDay()); // Go to Sunday
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

// Helper function for date formatting for display
const formatDisplayDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function for date formatting for input/key (YYYY-MM-DD)
const formatDateKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MealPlanPage = ({
  mealPlan,
  addRecipeToMealPlan,
  removeRecipeFromMealPlan,
  clearDayMealPlan,
  clearWeekMealPlan,
  saveNamedMealPlan,
  loadNamedMealPlan,
  namedMealPlans
}) => {
  const {
    currentUser
  } = useAuth();
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const weekDays = getWeekDays(currentWeekStart);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchModalDate, setSearchModalDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRecipes, setSearchRecipes] = useState(mockRecipes);

  const [mealPlanName, setMealPlanName] = useState('');

  useEffect(() => {
    // Filter recipes based on search query for the modal
    if (searchQuery) {
      setSearchRecipes(mockRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setSearchRecipes(mockRecipes);
    }
  }, [searchQuery]);

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const handleAddRecipeToDay = (dateKey) => {
    if (!currentUser) {
      alert('Please log in to manage your meal plan.');
      return;
    }
    setSearchModalDate(dateKey);
    setIsSearchModalOpen(true);
  };

  const handleSelectRecipeFromModal = (recipeId) => {
    if (searchModalDate) {
      addRecipeToMealPlan(recipeId, searchModalDate);
      setIsSearchModalOpen(false);
      setSearchModalDate(null);
      setSearchQuery('');
    }
  };

  const handleSaveMealPlan = () => {
    if (!currentUser) {
      alert('Please log in to save meal plans.');
      return;
    }
    if (mealPlanName.trim()) {
      saveNamedMealPlan(mealPlanName);
      alert(`Meal plan "${mealPlanName}" saved!`);
      setMealPlanName('');
    } else {
      alert('Please enter a name for your meal plan.');
    }
  };

  const handleLoadMealPlan = (planName) => {
    if (!currentUser) {
      alert('Please log in to load meal plans.');
      return;
    }
    loadNamedMealPlan(planName);
    alert(`Meal plan "${planName}" loaded!`);
  };

  const todayKey = formatDateKey(new Date());

  if (!currentUser) {
    return (
      <div className="container page-header">
        <h2>Meal Plan</h2>
        <p>Please log in to view and manage your meal plans.</p>
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
      <h1 className="page-header">Your Weekly Meal Plan</h1>

      <div className="meal-plan-header">
        <div className="meal-plan-nav-buttons">
          <button
            onClick={handlePrevWeek}
            className="button button-outline"
          >
            Previous Week
          </button>
          <button
            onClick={handleNextWeek}
            className="button button-outline"
          >
            Next Week
          </button>
        </div>
        <div className="meal-plan-header-actions">
          <input
            type="text"
            placeholder="Name your plan..."
            value={mealPlanName}
            onChange={(e) => setMealPlanName(e.target.value)}
            className="form-control"
            style={{
              width: '180px'
            }}
          />
          <button
            onClick={handleSaveMealPlan}
            className="button button-secondary"
          >
            Save Plan
          </button>
          <button
            onClick={() => clearWeekMealPlan(weekDays.map(formatDateKey))}
            className="button button-outline"
          >
            Clear Week
          </button>
        </div>
      </div>

      {namedMealPlans.length > 0 && (
        <div
          className="filters-container"
          style={{
            marginBottom: 'var(--spacing-xl)'
          }}
        >
          <div className="form-group filter-group">
            <label htmlFor="loadPlan">Load Saved Plan</label>
            <select
              id="loadPlan"
              onChange={(e) => handleLoadPlan(e.target.value)}
              value=""
            >
              <option value="">Select a plan</option>
              {namedMealPlans.map(planName => (
                <option
                  key={planName}
                  value={planName}
                >
                  {planName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="calendar-grid">
        {weekDays.map((day) => {
          const dateKey = formatDateKey(day);
          const recipesForDay = mealPlan[dateKey] || [];
          const isToday = dateKey === todayKey;

          return (
            <div
              key={dateKey}
              className={`calendar-day-slot ${isToday ? 'today' : ''}`}
            >
              <h4 className="calendar-day-header">{formatDisplayDate(day)}</h4>
              {recipesForDay.map((recipeId) => {
                const recipe = mockRecipes.find(r => r.id === recipeId);
                return recipe ? (
                  <div
                    key={recipeId}
                    className="meal-item"
                  >
                    <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    <button
                      className="icon-button"
                      onClick={() => removeRecipeFromMealPlan(recipeId, dateKey)}
                      aria-label="Remove recipe from this day"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : null;
              })}
              <button
                className="button button-outline"
                onClick={() => handleAddRecipeToDay(dateKey)}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  fontSize: '0.9rem',
                  padding: 'var(--spacing-xs) var(--spacing-sm)'
                }}
              >
                <PlusCircle size={16} />
                Add Recipe
              </button>
              {recipesForDay.length > 0 && (
                <button
                  className="button button-outline"
                  onClick={() => clearDayMealPlan(dateKey)}
                  style={{
                    width: '100%',
                    fontSize: '0.9rem',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    marginTop: 'var(--spacing-xs)'
                  }}
                >
                  Clear Day
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title={`Add Recipe to ${searchModalDate ? formatDisplayDate(new Date(searchModalDate)) : 'Day'}`}
      >
        <div className="form-group search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 'var(--spacing-xl)'
            }}
          />
        </div>
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
          marginTop: 'var(--spacing-md)'
        }}>
          {searchRecipes.length > 0 ? (
            searchRecipes.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-sm)',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <Link
                  to={`/recipes/${recipe.id}`}
                  onClick={() => setIsSearchModalOpen(false)}
                >
                  {recipe.title}
                </Link>
                <button
                  className="button button-primary"
                  onClick={() => handleSelectRecipeFromModal(recipe.id)}
                  style={{
                    fontSize: '0.8rem',
                    padding: 'var(--spacing-xs) var(--spacing-md)'
                  }}
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MealPlanPage;
