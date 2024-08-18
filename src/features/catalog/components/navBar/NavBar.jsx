import { Link, useLocation } from 'react-router-dom';
import logo from "@assets/imgs/logo.png";
import './NavBar.css'

// NavBar.jsx
function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

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
      </div>
      <ul className='navbar-links'>
        <li className='list-style'>
          {currentPath === '/inicio' ? (
            <span style={{ color: '#ffff' }}>Inicio</span>
          ) : (
            <Link to='/inicio'>Inicio</Link>
          )}
        </li>
        <li className='list-style'>
          {currentPath === '/manage' ? (
            <span style={{ color: '#ffff' }}>Administrar</span>
          ) : (
            <Link to='/manage'>Administrar</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;