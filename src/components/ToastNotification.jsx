import React from 'react';

const ToastNotification = ({ message, type = 'info' }) => {
  return (
    <div className={`toast-notification ${type}`}>
      {message}
    </div>
  );
};

export default ToastNotification;
