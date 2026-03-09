import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import { recipes } from '../data/recipes';

function RecipeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryName } = useParams();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentSearchTerm = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    setError(null);
    let results = [];

    const timer = setTimeout(() => {
      if (categoryName) {
        results = recipes.filter(recipe =>
          recipe.category.toLowerCase() === categoryName.toLowerCase()
        );
      } else if (currentSearchTerm) {
        const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
        results = recipes.filter(recipe =>
          recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          recipe.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          recipe.cuisine.toLowerCase().includes(lowerCaseSearchTerm) ||
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(lowerCaseSearchTerm)
          )
        );
      } else {
        results = recipes;
      }

      setFilteredRecipes(results);
      setLoading(false);
      if (results.length === 0 && (currentSearchTerm || categoryName)) {
        setError('No recipes found matching your criteria.');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSearchTerm, categoryName]);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const pageTitle = categoryName
    ? `${categoryName} Recipes`
    : currentSearchTerm
      ? `Results for "${currentSearchTerm}"`
      : 'All Recipes';

  return (
    <div>
      <Header />
      <div className="app-container">
        <SearchBar onSearch={handleSearch} initialSearchTerm={currentSearchTerm} />

        <h2 className="section-title">{pageTitle}</h2>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="recipe-list-grid">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeListPage;