/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import StarRating from '../components/StarRating/StarRating';
import baseURL from '../axios';
import { toast } from 'react-toastify';

const ForCommentNext = () => {
  const { locationId } = useParams();
  console.log(locationId);
  const img = JSON.parse(localStorage.getItem('pic'));

  const adres = localStorage.getItem('adres');
  const [location, setLocation] = useState({});

  const [likeLocation, setLikeLocation] = useState();
  const [apartment, setApartment] = useState();
  const [owner, setOwner] = useState();

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

  useEffect(() => {
    toast.info('Önceden eklenmiş ilan için görüşleriniz bildirebilirsiniz ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    toast.info('Bu işlem size +20 PUAN kazandıracak', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    const data = async () => {
      const response = await axios.get(`${baseURL}/api/ads/` + locationId);
      setLocation(response.data);
      return response.data;
    };

    data();
  }, [locationId]);

  console.log(location);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    console.log(likeLocation, apartment, owner);
    localStorage.setItem('likeLocation', JSON.stringify(likeLocation));
    localStorage.setItem('apartment', JSON.stringify(apartment));
    localStorage.setItem('owner', JSON.stringify(owner));
    localStorage.setItem('locationId', JSON.stringify(locationId));

    navigate('/Comment');
  };

  return (
    <Container>
      <Row>
        <label style={{ textAlign: 'center' }}>
          ÖNCEDEN VERİLMİŞ İLAN BİLGİLERİ
        </label>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <img src={location.image} width='300' height='200' />
        </Col>
        <Col>
          Adres : {location.adres}
          <h4 style={{ textAlign: 'center' }}>
            İLAN PUANI : {location.postRating}
          </h4>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>telefon numarası :{location.phone} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Adres tarifi :{location.apartment} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Yorumlar ve Bilgilendirme :{location.likeLocation} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>
          Bina değerlendirme puanı :{' '}
          {<Rating initialValue={location.apartmentRating} />}
        </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Mülk sahibi hakında görüşler : {location.owner} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>
          Mülk sahibi değerlendirme puanı :{' '}
          {<Rating initialValue={location.ownerRating} />}
        </label>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col>
          <img src={img} width='300' height='200' />
        </Col>
        <Col>Adres : {adres}</Col>
      </Row>
      <Row>
        <div className='form-group mt-3'>
          <label>Konumu tarif edermisiniz ?</label>
          <input
            name='likelocation'
            // type='email'
            className='form-control mt-1'
            placeholder='Telefon numarasını giriniz'
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
            placeholder='Telefon numarasını giriniz'
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
            placeholder='Telefon numarasını giriniz'
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

export default ForCommentNext;
