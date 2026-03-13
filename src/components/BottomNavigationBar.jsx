import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Package, Settings } from 'lucide-react';

function BottomNavigationBar() {
  return (
    <nav className="bottom-nav-bar">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ClipboardList size={20} />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Package size={20} />
        <span>Inventory</span>
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={20} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigationBar;