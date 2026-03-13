import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';

function Header() {
  const location = useLocation();

  const getAddLink = () => {
    if (location.pathname.startsWith('/orders')) {
      return '/orders/new';
    } else if (location.pathname.startsWith('/inventory')) {
      return '/inventory/ingredients/new'; // Default to adding ingredient
    } else if (location.pathname.startsWith('/payments')) {
      // Payments don't have a direct 'add' flow, usually tied to orders
      return null;
    }
    return null;
  };

  const addLink = getAddLink();

  return (
    <header className="header">
      <h1>Kitchen Dashboard</h1>
      {addLink && (
        <Link to={addLink} className="button-icon">
          <Plus size={24} />
        </Link>
      )}
    </header>
  );
}

export default Header;