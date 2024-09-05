import { useState, useEffect } from 'react';
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

  // Reset menu state when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

  let links = [
    { "name": "Inicio", "path": "/" },
    { "name": "Literatura", "path": "collection/literatura/1" },
    { "name": "Informativos", "path": "collection/informativos/2" }
  ]

  const handleOpenMenu = () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
  }

  return (
    <>
      <nav className='navbar p-4 pl-8 pr-8'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
          <div>
            <Link to='/'>
              <img className='w-24' src={logo} alt='logo' />
            </Link>
          </div>
          <h4 className=''>Amigos de la Biblioteca de Rosarito</h4>
          <button className='hidden' onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
        <ul  id='menu' className="flex flex-col h-0 opacity-0 md:h-auto md:opacity-100 md:flex-row gap-3">
          {links.map((link, index) => (
            <li className='hover:bg-white hover:text-gray-900 transition-all rounded-xl p-2' key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='fixed md:hidden top-10 right-5 z-50'>
        <button onClick={handleOpenMenu}>
          Open menu
        </button>
      </div>
    </>
  );
}

export default NavBar;