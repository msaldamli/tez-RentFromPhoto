import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/features/userslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: 'msaldamli48@gmail.com',
    password: '123',
  });
  const navigate = useNavigate();
  const userControl = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user, e, '123456789');
  };
  const handleClick = (e) => {
    e.preventDefault();

    const reqUser = JSON.stringify(user);
    const res = dispatch(login({ reqUser }));
    console.log(res);
    console.log(res, '11111122223333'); //calısıyor
    if (res) {
      toast.success('Hoşgeldiniz', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate('/');
    }

    // localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <Container className='Auth-form-container Container '>
      <Col></Col>
      <Col
        xs={12}
        md={{ span: 6, offset: 3 }}
        className='justify-content-center'
      >
        <form className='Auth-form'>
          <div className='Auth-form-content'>
            <h3 className='Auth-form-title'>Giriş yap</h3>
            <div className='text-center'>
              Henüz kayıt olmadınız mı?{' '}
              <span className='link-primary'>
                <Link to='/register'>Kaydol</Link>
              </span>
            </div>
            <div className='form-group mt-3'>
              <label>Email adresi</label>
              <input
                name='email'
                type='email'
                className='form-control mt-1'
                placeholder='Email adresinizi giriniz'
                onChange={userControl}
              />
            </div>
            <div className='form-group mt-3'>
              <label>Şifre</label>
              <input
                name='password'
                type='password'
                className='form-control mt-1'
                placeholder='Şifrenizi giriniz'
                onChange={userControl}
              />
            </div>
            <div className='d-grid gap-2 mt-3'>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={handleClick}
              >
                Giriş yap
              </button>
            </div>
            <p className='text-center mt-2'>
              {/* Forgot <a href="#">password?</a> */}
            </p>
          </div>
        </form>
      </Col>
      <Col></Col>
    </Container>
  );
};

export default Login;
