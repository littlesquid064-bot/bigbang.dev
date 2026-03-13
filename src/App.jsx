import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import BottomNavigationBar from './components/BottomNavigationBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Orders from './pages/Orders.jsx';
import Payments from './pages/Payments.jsx';
import Inventory from './pages/Inventory.jsx';
import Settings from './pages/Settings.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import AddEditOrder from './pages/AddEditOrder.jsx';
import AddEditIngredient from './pages/AddEditIngredient.jsx';
import AddEditRecipe from './pages/AddEditRecipe.jsx';
import { mockOrders, mockPayments, mockIngredients, mockRecipes } from './data/mockData.js';

function App() {
  const [orders, setOrders] = useState(mockOrders);
  const [payments, setPayments] = useState(mockPayments);
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    showToast('Order updated successfully!');
  };

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    showToast('Order added successfully!');
  };

  const updateIngredient = (updatedIngredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) => (ing.id === updatedIngredient.id ? updatedIngredient : ing))
    );
    showToast('Ingredient updated successfully!');
  };

  const addIngredient = (newIngredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    showToast('Ingredient added successfully!');
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((rec) => (rec.id === updatedRecipe.id ? updatedRecipe : rec))
    );
    showToast('Recipe updated successfully!');
  };

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    showToast('Recipe added successfully!');
  };

  const appData = {
    orders,
    payments,
    ingredients,
    recipes,
    updateOrder,
    addOrder,
    updateIngredient,
    addIngredient,
    updateRecipe,
    addRecipe,
    showToast
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard {...appData} />} />
          <Route path="/orders" element={<Orders {...appData} />} />
          <Route path="/orders/new" element={<AddEditOrder {...appData} />} />
          <Route path="/orders/:orderId" element={<OrderDetails {...appData} />} />
          <Route path="/orders/:orderId/edit" element={<AddEditOrder {...appData} />} />
          <Route path="/payments" element={<Payments {...appData} />} />
          <Route path="/inventory" element={<Inventory {...appData} />} />
          <Route path="/inventory/ingredients/new" element={<AddEditIngredient {...appData} />} />
          <Route path="/inventory/ingredients/:ingredientId/edit" element={<AddEditIngredient {...appData} />} />
          <Route path="/inventory/recipes/new" element={<AddEditRecipe {...appData} />} />
          <Route path="/inventory/recipes/:recipeId/edit" element={<AddEditRecipe {...appData} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <BottomNavigationBar />
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}
    </div>
  );
}

export default App;