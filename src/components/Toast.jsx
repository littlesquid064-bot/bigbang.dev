import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ message, type = 'info', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className={`toast toast-${type}`}>{message}</div>,
    document.getElementById('toast-root') || document.body
  );
};

// A simple manager for toasts
let toastQueue = [];
let setToasts = () => {};

export const ToastContainer = () => {
  const [toasts, setLocalToasts] = useState([]);
  setToasts = setLocalToasts; // Expose setter to global scope

  return (
    <div className="toast-container" id="toast-root">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} duration={toast.duration} />
      ))}
    </div>
  );
};

export const showToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now();
  setToasts((prev) => [...prev, { id, message, type, duration }]);
  setTimeout(() => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, duration + 500); // Give a bit extra time for fade-out
};
