import React, { useState } from 'react';

const SettingsPage = () => {
  const [kitchenName, setKitchenName] = useState('My Awesome Kitchen');
  const [contactEmail, setContactEmail] = useState('contact@awesomekitchen.com');
  const [contactPhone, setContactPhone] = useState('+123 456 7890');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
    // In a real app, you would save these to a backend or local storage
  };

  return (
    <div className="settings-page">
      <div className="card">
        <h2 className="text-lg mb-16">Kitchen Profile</h2>
        <form onSubmit={handleSaveSettings} className="settings-form">
          <div className="input-group">
            <label htmlFor="kitchenName">Kitchen Name</label>
            <input
              type="text"
              id="kitchenName"
              name="kitchenName"
              value={kitchenName}
              onChange={(e) => setKitchenName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="button">
            Save Settings
          </button>
        </form>
      </div>

      <div className="card mt-16">
        <h2 className="text-lg mb-16">About</h2>
        <p className="text-sm text-color-light">
          Mobile Kitchen Dashboard v1.0.0
        </p>
        <p className="text-sm text-color-light mt-8">
          Developed to streamline order, payment, and inventory management for small kitchens.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
