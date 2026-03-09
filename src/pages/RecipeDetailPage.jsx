import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { recipes } from '../data/recipes';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const foundRecipe = recipes.find((r) => r.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError('Recipe not found.');
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="app-container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="app-container">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null; // Should not happen with error handling above, but good practice
  }

  return (
    <div>
      <Header />
      <div className="app-container recipe-detail-page">
        <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
        <h1 className="recipe-detail-title">{recipe.name}</h1>
        <p className="recipe-detail-description">{recipe.description}</p>

        <div className="recipe-meta-grid">
          <div className="meta-item">
            <div className="meta-label">Prep Time</div>
            <div className="meta-value">{recipe.prepTime}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Cook Time</div>
            <div className="meta-value">{recipe.cookTime}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Servings</div>
            <div className="meta-value">{recipe.servings}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Cuisine</div>
            <div className="meta-value">{recipe.cuisine}</div>
          </div>
        </div>

        <h2 className="section-title">Ingredients</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="section-title">Instructions</h2>
        <ol className="instruction-list">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetailPage;