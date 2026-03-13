import React from 'react';
import { User, Bell, LogOut, Info } from 'lucide-react';

function Settings() {
  const handleLogout = () => {
    alert('Logging out...');
    // In a real app, this would clear auth tokens and redirect to login
  };

  return (
    <div className="settings-page">
      <h2 className="card-title">Settings</h2>

      <div className="list-container mb-16">
        <div className="list-item">
          <div className="list-item-content">
            <div className="list-item-title">Profile</div>
            <div className="list-item-subtitle">Manage your account details</div>
          </div>
          <User size={20} color="var(--text-color-light)" />
        </div>
        <div className="list-item">
          <div className="list-item-content">
            <div className="list-item-title">Notifications</div>
            <div className="list-item-subtitle">Configure alerts for low stock and new orders</div>
          </div>
          <Bell size={20} color="var(--text-color-light)" />
        </div>
        <div className="list-item">
          <div className="list-item-content">
            <div className="list-item-title">About</div>
            <div className="list-item-subtitle">App version and legal information</div>
          </div>
          <Info size={20} color="var(--text-color-light)" />
        </div>
      </div>

      <button onClick={handleLogout} className="button button-danger" style={{ width: '100%' }}>
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}

export default Settings;