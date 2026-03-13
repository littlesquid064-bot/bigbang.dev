import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Package, CookingPot } from 'lucide-react';

function Inventory({ ingredients, recipes }) {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIngredients = ingredients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRecipes = recipes.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <h2 className="card-title">Inventory Management</h2>

      <div className="search-filter-bar mb-16">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            className="input-text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-row gap-12 mb-16">
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`button ${activeTab === 'ingredients' ? 'button-primary' : 'button-secondary'}`}
          style={{ flexGrow: 1 }}
        >
          <Package size={20} /> Ingredients
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`button ${activeTab === 'recipes' ? 'button-primary' : 'button-secondary'}`}
          style={{ flexGrow: 1 }}
        >
          <CookingPot size={20} /> Recipes
        </button>
      </div>

      {activeTab === 'ingredients' && (
        <div className="ingredients-list">
          <div className="list-container">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((item) => (
                <Link to={`/inventory/ingredients/${item.id}/edit`} key={item.id} className="list-item">
                  <div className="list-item-content">
                    <div className="list-item-title">{item.name}</div>
                    <div className="list-item-subtitle">
                      Stock: {item.currentStock} {item.unit} (Min: {item.minStock} {item.unit})
                    </div>
                  </div>
                  {item.currentStock <= item.minStock && (
                    <span className="status-badge status-danger">Low Stock</span>
                  )}
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <Package size={60} />
                <h3>No Ingredients Found</h3>
                <p>Add new ingredients or adjust your search.</p>
              </div>
            )}
          </div>
          <Link to="/inventory/ingredients/new" className="button button-primary mb-16" style={{ width: '100%' }}>
            <Plus size={20} /> Add New Ingredient
          </Link>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="recipes-list">
          <div className="list-container">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Link to={`/inventory/recipes/${recipe.id}/edit`} key={recipe.id} className="list-item">
                  <div className="list-item-content">
                    <div className="list-item-title">{recipe.name}</div>
                    <div className="list-item-subtitle">
                      Items: {recipe.ingredients.length} | Servings: {recipe.servingSize}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <CookingPot size={60} />
                <h3>No Recipes Found</h3>
                <p>Define new recipes to streamline your kitchen.</p>
              </div>
            )}
          </div>
          <Link to="/inventory/recipes/new" className="button button-primary mb-16" style={{ width: '100%' }}>
            <Plus size={20} /> Add New Recipe
          </Link>
        </div>
      )}
    </div>
  );
}

export default Inventory;