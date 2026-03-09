import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <img src={recipe.image} alt={recipe.name} className="recipe-card-image" />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-meta">
          <Clock size={16} />
          {recipe.prepTime}
        </p>
      </div>
    </Link>
  );
}

export default RecipeCard;