import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ClipboardList,
  CreditCard,
  Package,
  Settings,
  Search,
  Bell,
  User
} from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Kitchen Companion
      </Link>
      <div className="navbar-nav">
        <div className="nav-item">
          <Link to="/" className={getNavLinkClass('/')}>
            <Home size={20} />
            Dashboard
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/orders" className={getNavLinkClass('/orders')}>
            <ClipboardList size={20} />
            Orders
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/payments" className={getNavLinkClass('/payments')}>
            <CreditCard size={20} />
            Payments
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/inventory" className={getNavLinkClass('/inventory')}>
            <Package size={20} />
            Inventory
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/settings" className={getNavLinkClass('/settings')}>
            <Settings size={20} />
            Settings
          </Link>
        </div>
      </div>
      <div className="navbar-icons">
        <button className="navbar-icon-button">
          <Search size={20} />
        </button>
        <button className="navbar-icon-button">
          <Bell size={20} />
        </button>
        <button className="navbar-icon-button">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
