import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, XCircle } from 'lucide-react';

function AddEditIngredient({ ingredients, addIngredient, updateIngredient, showToast }) {
  const { ingredientId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!ingredientId;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    currentStock: 0,
    unit: 'kg',
    minStock: 0,
    pricePerUnit: 0
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && ingredients.length > 0) {
      const ingredientToEdit = ingredients.find((ing) => ing.id === ingredientId);
      if (ingredientToEdit) {
        setFormData(ingredientToEdit);
      } else {
        navigate('/inventory');
      }
    } else if (!isEditing) {
      const newId = `ING${String(ingredients.length + 1).padStart(3, '0')}`;
      setFormData((prev) => ({ ...prev, id: newId }));
    }
  }, [isEditing, ingredientId, ingredients, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ingredient name is required.';
    if (formData.currentStock < 0) newErrors.currentStock = 'Stock cannot be negative.';
    if (formData.minStock < 0) newErrors.minStock = 'Minimum stock cannot be negative.';
    if (formData.pricePerUnit < 0) newErrors.pricePerUnit = 'Price per unit cannot be negative.';
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
      updateIngredient(formData);
    } else {
      addIngredient(formData);
    }
    navigate('/inventory');
  };

  return (
    <div className="add-edit-ingredient-page">
      <h2 className="card-title">{isEditing ? `Edit Ingredient: ${formData.name}` : 'Add New Ingredient'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="card mb-16">
          <div className="form-group">
            <label htmlFor="name">Ingredient Name</label>
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
            <label htmlFor="currentStock">Current Stock</label>
            <input
              type="number"
              id="currentStock"
              name="currentStock"
              className="input-number"
              value={formData.currentStock}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            {errors.currentStock && <p className="text-danger">{errors.currentStock}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              id="unit"
              name="unit"
              className="select-dropdown"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="grams">grams</option>
              <option value="liters">liters</option>
              <option value="ml">ml</option>
              <option value="pieces">pieces</option>
              <option value="units">units</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="minStock">Minimum Stock Level</label>
            <input
              type="number"
              id="minStock"
              name="minStock"
              className="input-number"
              value={formData.minStock}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            {errors.minStock && <p className="text-danger">{errors.minStock}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="pricePerUnit">Price Per Unit</label>
            <input
              type="number"
              id="pricePerUnit"
              name="pricePerUnit"
              className="input-number"
              value={formData.pricePerUnit}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            {errors.pricePerUnit && <p className="text-danger">{errors.pricePerUnit}</p>}
          </div>
        </div>

        <div className="flex-row gap-12 mb-16">
          <button type="button" onClick={() => navigate('/inventory')} className="button button-secondary" style={{ flexGrow: 1 }}>
            <XCircle size={20} /> Cancel
          </button>
          <button type="submit" className="button button-primary" style={{ flexGrow: 1 }}>
            <Save size={20} /> {isEditing ? 'Save Changes' : 'Add Ingredient'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditIngredient;