import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/features/userslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    telefon: '',
    password: '',
  });

  const userSave = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user, e);
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    try {
      toast.success('Aramıza Hoşgeldiniz ', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      toast.info('Email ve Şifreniz ile giris Yapabilirsiniz', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      e.preventDefault();
      const jsonUser = JSON.stringify(user);
      const res = dispatch(register({ jsonUser }));
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className='Auth-form-container'>
      <Col xs={12} md={{ span: 6, offset: 3 }}>
        <form className='Auth-form'>
          <div className='Auth-form-content'>
            <h3 className='Auth-form-title'>Kayıt ol</h3>
            <div className='text-center'>
              Zaten kayıtlımısınız?{' '}
              <span className='link-primary'>
                <Link to='/login'>Giriş yap</Link>
              </span>
            </div>
            <div className='form-group mt-3'>
              <label>Ad-Soyad</label>
              <input
                name='name'
                type='text'
                className='form-control mt-1'
                placeholder='isim ve soyisminizi giriniz'
                onChange={userSave}
              />
            </div>
            <div className='form-group mt-3'>
              <label>Email adresi</label>
              <input
                name='email'
                type='email'
                className='form-control mt-1'
                placeholder='Email adresi'
                onChange={userSave}
              />
            </div>
            <div className='form-group mt-3'>
              <label>telefon No</label>
              <input
                name='telefon'
                type='text'
                className='form-control mt-1'
                placeholder='telefon numarası'
                onChange={userSave}
              />
            </div>
            <div className='form-group mt-3'>
              <label>Şifre</label>
              <input
                name='password'
                type='password'
                className='form-control mt-1'
                placeholder='Şifre'
                onChange={userSave}
              />
            </div>
            <div className='d-grid gap-2 mt-3'>
              <button
                type='submit'
                onClick={handleClick}
                className='btn btn-primary'
              >
                Kayıt ol
              </button>
            </div>
            <p className='text-center mt-2'>
              {/* Forgot <a href="#">password?</a> */}
            </p>
          </div>
        </form>
      </Col>
    </Container>
  );
};

export default Register;
