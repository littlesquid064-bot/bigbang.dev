import React from 'react';

function ChartCard({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        {children || <p className="text-center text-gray-600">Chart Placeholder</p>}
      </div>
    </div>
  );
}

export default ChartCard;
