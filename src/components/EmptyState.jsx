import React from 'react';
import { PackageSearch } from 'lucide-react';

const EmptyState = ({ icon: Icon = PackageSearch, title, message }) => {
  return (
    <div className="empty-state">
      <Icon size={64} />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
