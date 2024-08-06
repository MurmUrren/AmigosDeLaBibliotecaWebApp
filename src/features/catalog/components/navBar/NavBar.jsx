import './NavBar.css'
import { Link } from 'react-router-dom';

// NavBar.jsx
function NavBar() {

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
      </div>
      <ul className='navbar-links'>
        <li className='list-style'><Link to='/inicio'>Inicio</Link></li>
        <li className='list-style'><Link to='/manage'>Manage Books</Link></li>
        <li className='list-style'><Link to='/contactanos'>Contáctanos</Link></li>
      </ul>
    </nav>
  );
};
  
export default NavBar;