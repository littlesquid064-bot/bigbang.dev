import {
  useState,
  useEffect
} from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MealPlanPage from './pages/MealPlanPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import {
  useAuth
} from './context/AuthContext';

// Helper for date keys
const formatDateKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  const {
    currentUser
  } = useAuth();
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('recipeHubFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [mealPlan, setMealPlan] = useState(() => {
    const savedMealPlan = localStorage.getItem('recipeHubMealPlan');
    return savedMealPlan ? JSON.parse(savedMealPlan) : {};
  });
  const [namedMealPlans, setNamedMealPlans] = useState(() => {
    const savedNamedPlans = localStorage.getItem('recipeHubNamedMealPlans');
    return savedNamedPlans ? JSON.parse(savedNamedPlans) : {};
  });

  useEffect(() => {
    localStorage.setItem('recipeHubFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recipeHubMealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('recipeHubNamedMealPlans', JSON.stringify(namedMealPlans));
  }, [namedMealPlans]);


  const toggleFavorite = (recipeId) => {
    if (!currentUser) {
      alert('Please log in to manage favorites.');
      return;
    }
    setFavorites(prevFavorites =>
      prevFavorites.includes(recipeId) ?
      prevFavorites.filter(id => id !== recipeId) :
      [...prevFavorites, recipeId]
    );
  };

  const addRecipeToMealPlan = (recipeId, date) => {
    if (!currentUser) {
      alert('Please log in to manage your meal plan.');
      return;
    }
    const dateKey = formatDateKey(date);
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [dateKey]: [...(prevPlan[dateKey] || []), recipeId]
    }));
  };

  const removeRecipeFromMealPlan = (recipeId, date) => {
    if (!currentUser) {
      alert('Please log in to manage your meal plan.');
      return;
    }
    const dateKey = formatDateKey(date);
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [dateKey]: prevPlan[dateKey].filter(id => id !== recipeId)
    }));
  };

  const clearDayMealPlan = (date) => {
    if (!currentUser) {
      alert('Please log in to manage your meal plan.');
      return;
    }
    const dateKey = formatDateKey(date);
    setMealPlan(prevPlan => {
      const newPlan = {
        ...prevPlan
      };
      delete newPlan[dateKey];
      return newPlan;
    });
  };

  const clearWeekMealPlan = (dateKeys) => {
    if (!currentUser) {
      alert('Please log in to manage your meal plan.');
      return;
    }
    setMealPlan(prevPlan => {
      const newPlan = {
        ...prevPlan
      };
      dateKeys.forEach(dateKey => {
        delete newPlan[dateKey];
      });
      return newPlan;
    });
  };

  const saveNamedMealPlan = (planName) => {
    if (!currentUser) {
      alert('Please log in to save meal plans.');
      return;
    }
    setNamedMealPlans(prevNamedPlans => ({
      ...prevNamedPlans,
      [planName]: mealPlan
    }));
  };

  const loadNamedMealPlan = (planName) => {
    if (!currentUser) {
      alert('Please log in to load meal plans.');
      return;
    }
    const loadedPlan = namedMealPlans[planName];
    if (loadedPlan) {
      setMealPlan(loadedPlan);
    }
  };

  const getNamedMealPlanList = () => Object.keys(namedMealPlans);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addRecipeToMealPlan={addRecipeToMealPlan}
              />
            }
          />
          <Route
            path="/recipes"
            element={
              <RecipesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addRecipeToMealPlan={addRecipeToMealPlan}
              />
            }
          />
          <Route
            path="/recipes/:id"
            element={
              <RecipeDetailPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addRecipeToMealPlan={addRecipeToMealPlan}
              />
            }
          />
          <Route
            path="/meal-plan"
            element={
              <MealPlanPage
                mealPlan={mealPlan}
                addRecipeToMealPlan={addRecipeToMealPlan}
                removeRecipeFromMealPlan={removeRecipeFromMealPlan}
                clearDayMealPlan={clearDayMealPlan}
                clearWeekMealPlan={clearWeekMealPlan}
                saveNamedMealPlan={saveNamedMealPlan}
                loadNamedMealPlan={loadNamedMealPlan}
                namedMealPlans={getNamedMealPlanList()}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addRecipeToMealPlan={addRecipeToMealPlan}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                favorites={favorites}
                namedMealPlans={getNamedMealPlanList()}
                loadNamedMealPlan={loadNamedMealPlan}
              />
            }
          />
          <Route
            path="/about"
            element={<div className="container page-header"><h2>About Us</h2><p>Learn more about Recipe Hub.</p></div>}
          />
          <Route
            path="/contact"
            element={<div className="container page-header"><h2>Contact Us</h2><p>Get in touch with us.</p></div>}
          />
          <Route
            path="/privacy"
            element={<div className="container page-header"><h2>Privacy Policy</h2><p>Our commitment to your privacy.</p></div>}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
