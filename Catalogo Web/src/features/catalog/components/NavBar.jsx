import './NavBar.css'
// NavBar.jsx
function NavBar() {
    return (
      <nav className='navbar'>
        <div className='navbar-logo'>

        </div>
        <ul className='navbar-links'>
          <li><a href='#home'>Home</a></li>
          <li><a href='#search'>Search</a></li>
          <li><a href='#books'>Books</a></li>
        </ul>
      </nav>
    );
  }
  
  export default NavBar;