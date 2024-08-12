import { Link } from 'react-router-dom';
import logo from "@assets/imgs/logo.png";
import './NavBar.css'

// NavBar.jsx
function NavBar() {

  return (
    <nav className='navbar'>
      <div className='navbar-logo-title'>
        <div className='navbar-logo'>
          <Link to='/inicio'>
            <img src={logo} alt='logo' />
          </Link>
        </div>
        <h4 className='navbar-title'>Amigos de la Biblioteca de Rosarito</h4>
      </div>
      <ul className='navbar-links'>
        <li className='list-style'><Link to='/inicio'>Inicio</Link></li>
        <li className='list-style'><Link to='/manage'>Manage Books</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;