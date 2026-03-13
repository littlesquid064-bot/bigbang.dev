import React from 'react';

function SummaryCard({ title, value, icon: Icon, valueColorClass = '' }) {
  return (
    <div className="card summary-card">
      {Icon && <Icon size={32} className="summary-card-icon" />}
      <h3 className="summary-card-title">{title}</h3>
      <p className={`summary-card-value ${valueColorClass}`}>
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;
