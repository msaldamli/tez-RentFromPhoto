import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { createNevImage } from '../api/imagePost';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { earnPoint } from '../api/api';

const ShoweAd = () => {
  const img = JSON.parse(localStorage.getItem('pic'));
  const adres = localStorage.getItem('adres');
  const phone = JSON.parse(localStorage.getItem('phone'));
  const likeLocation = JSON.parse(localStorage.getItem('likeLocation'));
  const apartment = JSON.parse(localStorage.getItem('apartment'));
  const owner = JSON.parse(localStorage.getItem('owner'));
  const bina = JSON.parse(localStorage.getItem('bina'));
  const sahip = JSON.parse(localStorage.getItem('sahip'));
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const postType = JSON.parse(localStorage.getItem('toggle'));

  const [point, setPoint] = useState({
    userId: userId,
    point: 30,
  });

  console.log(postType);

  useEffect(() => {
    toast.info('Bilgileri kontrol ediniz', {
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

  const [sendADD, setSendAdd] = useState({
    userId: userId,
    lat: localStorage.getItem('lat'),
    lng: localStorage.getItem('lng'),
    phone: phone.phone,
    likeLocation: likeLocation.likelocation,
    image: img,
    adres: adres,
    apartment: apartment.apartment,
    owner: owner.owner,
    apartmentRating: bina,
    ownerRating: sahip,
    postType: postType,
  });

  const navigate = useNavigate();

  const SendAdd = async (e) => {
    try {
      earnPoint(JSON.stringify(point));

      toast.info('TEBRİKLER +30 PUAN KAZANDINIZ ', {
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
      const response = await createNevImage(sendADD);
      console.log(response);
      navigate('/Home');
      // localStorage.removeItem('pic');
      // localStorage.removeItem('owner');
      // localStorage.removeItem('sahip');
      // localStorage.removeItem('lng');
      // localStorage.removeItem('apartment');
      // localStorage.removeItem('bina');
      // localStorage.removeItem('lat');
      // localStorage.removeItem('adres');
      // localStorage.removeItem('phone');
      // localStorage.removeItem('likeLocation');
      // localStorage.removeItem('toggle')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <img src={img} width='300' height='200' />
        </Col>
        <Col>Adres : {adres}</Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>
          İlan türü :{' '}
          {postType ? (
            <span style={{ marginLeft: 10 }}>SATILIK</span>
          ) : (
            <span style={{ marginLeft: 10 }}>KİRALIK</span>
          )}
        </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Vermiş olduğunuz telefon numarası : {phone.phone} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Adres tarifi :{likeLocation.likelocation} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Yorumlarınız ve Bilgilendirme :{apartment.apartment} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>
          Bina için yaptığınız değerlendirme puanı :{' '}
          {<Rating initialValue={bina} />}
        </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>Mülk sahibi hakında görüşleriniz : {owner.owner} </label>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <label>
          Mülk sahibi için yaptığınız değerlendirme puanı :{' '}
          {<Rating initialValue={sahip} />}
        </label>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <button onClick={SendAdd} className='btn btn-primary'>
          İlan Yükle
        </button>
      </Row>
    </Container>
  );
};

export default ShoweAd;
