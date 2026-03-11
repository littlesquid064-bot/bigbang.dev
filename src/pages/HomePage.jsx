import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { recipes as allRecipes } from '../data/recipes';
import { Loader } from 'lucide-react';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  useEffect(() => {
    // Initially display all recipes or a default set
    setSearchResults(allRecipes);
  }, []);

  const handleSearch = (term) => {
    setCurrentSearchTerm(term);
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const filtered = allRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(term.toLowerCase())
          )
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <div className="loading-indicator">
          <Loader size={30} className="spinner" />
          <p>Loading recipes...</p>
        </div>
      ) : searchResults.length === 0 && currentSearchTerm !== '' ? (
        <div className="no-results">
          <p>No recipes found for "{currentSearchTerm}".</p>
          <p>Try searching for something else!</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="no-results">
          <p>No recipes available.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {searchResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;