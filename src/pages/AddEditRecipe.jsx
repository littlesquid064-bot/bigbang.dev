import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, XCircle } from 'lucide-react';
import { getIngredientName } from '../data/mockData';

function AddEditRecipe({ recipes, ingredients, addRecipe, updateRecipe, showToast }) {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!recipeId;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    ingredients: [{ ingredientId: '', quantity: 1, unit: 'kg' }],
    servingSize: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && recipes.length > 0) {
      const recipeToEdit = recipes.find((rec) => rec.id === recipeId);
      if (recipeToEdit) {
        setFormData(recipeToEdit);
      } else {
        navigate('/inventory');
      }
    } else if (!isEditing) {
      const newId = `REC${String(recipes.length + 1).padStart(3, '0')}`;
      setFormData((prev) => ({ ...prev, id: newId }));
    }
  }, [isEditing, recipeId, recipes, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'servingSize' ? parseInt(value) || 1 : value
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = formData.ingredients.map((ing, i) => {
      if (i === index) {
        return { ...ing, [name]: name === 'quantity' ? parseFloat(value) || 0 : value };
      }
      return ing;
    });
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredientToRecipe = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredientId: '', quantity: 1, unit: 'kg' }]
    }));
  };

  const removeIngredientFromRecipe = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Recipe name is required.';
    if (formData.servingSize <= 0) newErrors.servingSize = 'Serving size must be positive.';
    if (formData.ingredients.length === 0) newErrors.ingredients = 'At least one ingredient is required.';
    formData.ingredients.forEach((ing, index) => {
      if (!ing.ingredientId) newErrors[`ingredientId${index}`] = 'Ingredient selection is required.';
      if (ing.quantity <= 0) newErrors[`ingredientQuantity${index}`] = 'Quantity must be positive.';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the errors in the form.');
      return;
    }

    if (isEditing) {
      updateRecipe(formData);
    } else {
      addRecipe(formData);
    }
    navigate('/inventory');
  };

  return (
    <div className="add-edit-recipe-page">
      <h2 className="card-title">{isEditing ? `Edit Recipe: ${formData.name}` : 'Add New Recipe'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="card mb-16">
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-text"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="servingSize">Serving Size</label>
            <input
              type="number"
              id="servingSize"
              name="servingSize"
              className="input-number"
              value={formData.servingSize}
              onChange={handleChange}
              min="1"
            />
            {errors.servingSize && <p className="text-danger">{errors.servingSize}</p>}
          </div>
        </div>

        <div className="card mb-16">
          <h3 className="card-title">Ingredients</h3>
          {errors.ingredients && <p className="text-danger">{errors.ingredients}</p>}
          {formData.ingredients.map((ing, index) => (
            <div key={index} className="flex-row items-center gap-12 mb-16">
              <div style={{ flexGrow: 1 }}>
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <select
                    name="ingredientId"
                    className="select-dropdown"
                    value={ing.ingredientId}
                    onChange={(e) => handleIngredientChange(index, e)}
                  >
                    <option value="">Select Ingredient</option>
                    {ingredients.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors[`ingredientId${index}`] && <p className="text-danger">{errors[`ingredientId${index}`]}</p>}
                </div>
                <div className="flex-row gap-12">
                  <div className="form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      className="input-number"
                      value={ing.quantity}
                      onChange={(e) => handleIngredientChange(index, e)}
                      min="0.01"
                      step="0.01"
                    />
                    {errors[`ingredientQuantity${index}`] && <p className="text-danger">{errors[`ingredientQuantity${index}`]}</p>}
                  </div>
                  <div className="form-group" style={{ flex: 1, marginBottom: '0' }}>
                    <select
                      name="unit"
                      className="select-dropdown"
                      value={ing.unit}
                      onChange={(e) => handleIngredientChange(index, e)}
                    >
                      <option value="kg">kg</option>
                      <option value="grams">grams</option>
                      <option value="liters">liters</option>
                      <option value="ml">ml</option>
                      <option value="pieces">pieces</option>
                      <option value="units">units</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeIngredientFromRecipe(index)}
                className="button button-danger"
                style={{ padding: '10px 12px' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredientToRecipe} className="button button-secondary" style={{ width: '100%' }}>
            <Plus size={20} /> Add Ingredient
          </button>
        </div>

        <div className="flex-row gap-12 mb-16">
          <button type="button" onClick={() => navigate('/inventory')} className="button button-secondary" style={{ flexGrow: 1 }}>
            <XCircle size={20} /> Cancel
          </button>
          <button type="submit" className="button button-primary" style={{ flexGrow: 1 }}>
            <Save size={20} /> {isEditing ? 'Save Changes' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditRecipe;