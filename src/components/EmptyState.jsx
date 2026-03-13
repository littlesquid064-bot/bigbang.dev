import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ message, actionButton }) => {
  return (
    <div className="empty-state">
      <Inbox size={60} />
      <p>{message}</p>
      {actionButton}
    </div>
  );
};

export default EmptyState;
