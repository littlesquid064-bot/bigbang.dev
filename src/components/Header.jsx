import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <header>
      {!isHomePage && (
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
      )}
      <Link to="/" className="header-title" style={{ marginLeft: isHomePage ? '0' : 'auto', marginRight: isHomePage ? 'auto' : '0' }}>
        Recipe Finder
      </Link>
      {/* Placeholder for future right-side icons if needed */}
      {!isHomePage && <div style={{ width: '24px' }}></div>}
    </header>
  );
}

export default Header;