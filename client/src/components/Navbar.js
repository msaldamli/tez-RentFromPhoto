import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../api/features/userslice';

const Navbar = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    toast.error('Çıkış yaptınız !!   Sayfayı yenileyiniz', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    localStorage.removeItem('user');
    navigate('/Home');
    dispatch(logout());
  };
  return (
    <Container className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__item'>
          <Link to='/Home' className='navbar__link'>
            RENT FROM PHOTO
          </Link>
        </li>
        <li className='navbar__item'>
          <Link to='/' className='navbar__link'>
            Ana Sayfa
          </Link>
        </li>
        {user && (
          <li className='navbar__item'>
            <Link to='/Add' className='navbar__link'>
              Yeni İlan
            </Link>
          </li>
        )}
        {user && (
          <li className='navbar__item'>
            <Link to='/Profile' className='navbar__link'>
              Profil
            </Link>
          </li>
        )}
        <li className='navbar__item'>
          <Link to='/Leader' className='navbar__link'>
            Liderlik Tablosu
          </Link>
        </li>

        {!user ? (
          <li className='navbar__item '>
            <Link to='login' className='navbar__link '>
              Giriş Yap
            </Link>
          </li>
        ) : (
          <li className='navbar__item'>
            <Link to='/' className='navbar__link ' onClick={handleClick}>
              Çıkış Yap
            </Link>
          </li>
        )}
      </ul>
    </Container>
  );
};

export default Navbar;
