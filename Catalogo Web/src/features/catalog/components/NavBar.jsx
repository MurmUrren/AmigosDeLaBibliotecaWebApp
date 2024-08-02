import './NavBar.css'
import { Link } from 'react-router-dom';

// NavBar.jsx
function NavBar() {
    return (
      <nav className='navbar'>
        <div className='navbar-logo'>

        </div>
        <ul className='navbar-links'>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/search'>Search</Link></li>
          <li><Link to='/books'>Books</Link></li>
        </ul>
      </nav>
    );
  }
  
  export default NavBar;