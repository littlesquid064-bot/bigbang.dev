import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname.startsWith('/recipes/');

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      {isDetailPage ? (
        <button onClick={handleBackClick} className="back-button">
          <ChevronLeft size={20} />
          Back
        </button>
      ) : (
        <div /> /* Placeholder for alignment when no back button */
      )}
      <Link to="/" className="header-title">
        Recipe Finder
      </Link>
      <div /> {/* Placeholder for alignment */}
    </header>
  );
}

export default Header;