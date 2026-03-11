import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-card-image"
      />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
      </div>
    </Link>
  );
}

export default RecipeCard;