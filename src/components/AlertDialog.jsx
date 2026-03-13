import React from 'react';

const AlertDialog = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  return (
    <div className="alert-dialog-overlay">
      <div className="alert-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="alert-dialog-actions">
          <button onClick={onCancel} className="button outline">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="button danger">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
