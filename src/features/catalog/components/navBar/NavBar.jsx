import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@assets/imgs/logo.png';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo-title'>
        <div className='navbar-logo'>
          {currentPath === '/inicio' ? (
            <img src={logo} alt='logo' />
          ) : (
            <Link to='/inicio'>
              <img src={logo} alt='logo' />
            </Link>
          )}
        </div>
        <h4 className='navbar-title'>Amigos de la Biblioteca de Rosarito</h4>
        <button className='navbar-toggle' onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li className={`navbar-list-style ${currentPath === '/inicio' ? 'active' : ''}`}>
          <Link to='/inicio'>Inicio</Link>
        </li>
        <li className={`navbar-list-style ${currentPath === '/manage' ? 'active' : ''}`}>
          <Link to='/manage'>Administrar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
