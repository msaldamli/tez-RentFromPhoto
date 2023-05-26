/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import StarRating from '../components/StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
import { Switch } from 'antd';
import { toast } from 'react-toastify';

const AddNext = () => {
  const img = JSON.parse(localStorage.getItem('pic'));

  const adres = localStorage.getItem('adres');
  const [adress, setAdres] = useState();
  useEffect(() => {
    toast.info('ilan bilgilerini eklemek size +10 puan kazandıracak ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    toast.info('ilanın KİRALIK yada SATILIK durmuna lütfen dikkat ediniz  ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }, []);

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${localStorage.getItem(
        'lat'
      )}&lon=${localStorage.getItem('lng')}&format=json`,
      {
        headers: {
          'User-Agent': 'ID of your APP/service/website/etc. v0.1',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.display_name);
        setAdres(res.display_name);
        localStorage.setItem('adres', res.display_name);
      });
  }, []);

  const [phone, setPhone] = useState();
  const [likeLocation, setLikeLocation] = useState();
  const [apartment, setApartment] = useState();
  const [owner, setOwner] = useState();

  const phoneAdd = (e) => {
    setPhone({ ...phone, [e.target.name]: e.target.value });
    console.log(phone);
  };

  const likeLocationAdd = (e) => {
    setLikeLocation({ ...likeLocation, [e.target.name]: e.target.value });
    console.log(likeLocation);
  };
  const apartmentAdd = (e) => {
    setApartment({ ...apartment, [e.target.name]: e.target.value });
    console.log(apartment);
  };
  const ownerAdd = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
    console.log(owner);
  };

  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    console.log(phone, likeLocation, apartment, owner);
    localStorage.setItem('phone', JSON.stringify(phone));
    localStorage.setItem('likeLocation', JSON.stringify(likeLocation));
    localStorage.setItem('apartment', JSON.stringify(apartment));
    localStorage.setItem('owner', JSON.stringify(owner));
    localStorage.setItem('toggle', JSON.stringify(toggle));

    navigate('/ShoweAd');
  };

  const [toggle, setTogle] = useState(false);

  const toggler = () => {
    toggle ? setTogle(false) : setTogle(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <img src={img} width='300' height='200' />
        </Col>
        <Col>Adres : {adres}</Col>
      </Row>
      <Row>
        <Col style={{ marginTop: 10 }}>
          <label>İlanın durumunu saçebilirmisiniz ?</label>
          <Switch style={{ width: 40, marginLeft: 10 }} onClick={toggler} />
          {toggle ? (
            <span style={{ marginLeft: 10 }}>SATILIK </span>
          ) : (
            <span style={{ marginLeft: 10 }}>KİRALIK</span>
          )}
        </Col>
      </Row>
      <Row>
        <div className='form-group mt-3'>
          <label>Telefon Numarası</label>
          <input
            name='phone'
            // type='email'
            className='form-control mt-1'
            placeholder='Telefon bilgilerini giriniz. '
            onChange={phoneAdd}
          />
        </div>
      </Row>
      <Row>
        <div className='form-group mt-3'>
          <label>Konumu tarif edermisiniz ?</label>
          <input
            name='likelocation'
            // type='email'
            className='form-control mt-1'
            placeholder='Konum Tarifi giriniz.'
            onChange={likeLocationAdd}
          />
        </div>
      </Row>
      <Row>
        <div className='form-group mt-3'>
          <label>Daire veya bina hakkında bilgi verebilirmisiniz ? *** </label>
          <input
            name='apartment'
            // type='email'
            className='form-control mt-1'
            placeholder='İlan hakkında bilgi ve görüşlerinizi yazanız.'
            onChange={apartmentAdd}
          />
        </div>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Binaya puan verebilirmisinz ? </label>
        <StarRating id={0} />
      </Row>
      <Row>
        <div className='form-group mt-3'>
          <label>Mülk sahibi hakında bilgi bilgi verebilirmisiniz ? </label>
          <input
            name='owner'
            // type='email'
            className='form-control mt-1'
            placeholder='mülk sahibi hakında bilgi bilgi ve görüşleriniz '
            onChange={ownerAdd}
          />
        </div>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Mülk sahibine puan verebilirmisiniz ? </label>
        <StarRating id={1} />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <button onClick={handleNext} className='btn btn-primary'>
          Sonraki
        </button>
      </Row>
    </Container>
  );
};

export default AddNext;
