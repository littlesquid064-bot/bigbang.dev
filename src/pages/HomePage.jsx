import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { recipes, categories as allCategories } from '../data/recipes';
import { Clock, Leaf, Cake, Soup, Coffee, Salad } from 'lucide-react';

const categoryIcons = {
  Clock: Clock,
  Leaf: Leaf,
  Cake: Cake,
  Soup: Soup,
  Coffee: Coffee,
  Salad: Salad,
};

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [popularRecipes, setPopularRecipes] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setPopularRecipes(recipes.slice(0, 3)); // Display first 3 as popular
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // If search term is empty, navigate to general recipes list or home
      navigate('/recipes');
    }
  };

  return (
    <div>
      <Header />
      <div className="app-container">
        <SearchBar onSearch={handleSearch} />

        <section className="category-section">
          <h2>Explore Categories</h2>
          <div className="category-grid">
            {allCategories.map((category) => {
              const IconComponent = categoryIcons[category.icon];
              return (
                <Link
                  to={`/categories/${encodeURIComponent(category.name)}`}
                  key={category.name}
                  className="category-card"
                >
                  {IconComponent && <IconComponent size={36} className="category-icon" />}
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="popular-recipes">
          <h2>Popular Recipes</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="recipe-list-grid">
              {popularRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;