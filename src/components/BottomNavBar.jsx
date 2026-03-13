import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ListOrdered,
  ReceiptText,
  Package,
  LayoutDashboard,
} from 'lucide-react';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/orders', icon: ListOrdered, label: 'Orders' },
    { path: '/payments', icon: ReceiptText, label: 'Payments' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;
