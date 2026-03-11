import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { Clock } from 'lucide-react';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching a single recipe by ID
    setTimeout(() => {
      const foundRecipe = recipes.find((r) => r.id === id);
      setRecipe(foundRecipe);
      setIsLoading(false);
    }, 300);
  }, [id]);

  if (isLoading) {
    return <div className="loading-indicator">Loading recipe details...</div>;
  }

  if (!recipe) {
    return <div className="no-results">Recipe not found.</div>;
  }

  return (
    <div className="recipe-detail-container">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-detail-image"
      />
      <h1 className="recipe-detail-title">{recipe.title}</h1>
      <p className="recipe-detail-prep-time">
        <Clock size={20} />
        Preparation Time: {recipe.prepTime}
      </p>

      <h2 className="section-title">Ingredients</h2>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="section-title">Instructions</h2>
      <ol className="instructions-list">
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;