import React from 'react';
import { Link } from 'react-router-dom';
import './Navber.css'; // Stil dosyası için import edildi

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Ana Sayfa
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/ilanlar' className='nav-link'>
            Yeni İlan
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/profil' className='nav-link'>
            Profil
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/liderlik-tablosu' className='nav-link'>
            Liderlik Tablosu
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/giris-yap' className='nav-link'>
            GİRİŞ YAP
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
