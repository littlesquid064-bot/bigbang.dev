import {
  Link
} from 'react-router-dom';
import {
  Heart,
  CalendarDays,
  Clock
} from 'lucide-react';

const RecipeCard = ({
  recipe,
  onAddToFavorites,
  onAddToMealPlan,
  isFavorite
}) => {
  return (
    <div className="card recipe-card">
      <Link to={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-card-image"
        />
      </Link>
      <div className="recipe-card-content">
        <Link to={`/recipes/${recipe.id}`}>
          <h3 className="recipe-card-title">{recipe.title}</h3>
        </Link>
        <p className="recipe-card-description">{recipe.description}</p>
        <div className="recipe-card-meta">
          <span>
            <Clock size={16} />
            {recipe.prepTime}
          </span>
          <span>
            <Clock size={16} />
            {recipe.cookTime}
          </span>
        </div>
        <div className="recipe-card-actions">
          <button
            className="icon-button"
            onClick={() => onAddToFavorites(recipe.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            style={{
              color: isFavorite ? 'var(--primary-color)' : 'var(--text-color-light)'
            }}
          >
            <Heart
              size={20}
              fill={isFavorite ? 'var(--primary-color)' : 'none'}
            />
          </button>
          <button
            className="icon-button"
            onClick={() => onAddToMealPlan(recipe.id)}
            aria-label="Add to meal plan"
          >
            <CalendarDays size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
