import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Warehouse, Wallet, Settings } from 'lucide-react';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/orders', icon: ClipboardList, label: 'Orders' },
    { path: '/inventory', icon: Warehouse, label: 'Inventory' },
    { path: '/payments', icon: Wallet, label: 'Payments' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav-bar">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;
