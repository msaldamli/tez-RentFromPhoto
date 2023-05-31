/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import baseURL from '../axios';
import ShowComment from '../components/Comment/ShowComment';
import StarRating from '../components/StarRating/StarRating';
// import { Button } from 'antd';
import Button from 'react-bootstrap/Button';
import { postRatingAdd } from '../api/imagePost';
import { earnPoint, getOneUser } from '../api/api';

const Location = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  // console.log(user);
  const userId = user._id;
  console.log(userId);
  const [point, setPoint] = useState({
    userId: userId,
    point: 5,
  });
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  console.log(location);
  const [date, setDate] = useState('');
  const [durum, setDurum] = useState(true);
  // const [postRating, setPostRating] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${baseURL}/api/ads/` + locationId);
      return res.data;
    };
    fetchUser().then((r) => {
      var date = new Date(r.createdAt); // dateStr you get from mongodb

      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      const str = `${d}/${m}/${y}`;
      setDate(str);
      setLocation(r);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId]);

  const [comments, setComments] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${baseURL}/api/comments/` + locationId);
      return res.data;

      // return res.data;
    };
    fetchUser().then((response) => {
      // eslint-disable-next-line array-callback-return
      response.map((item) => {
        setComments(item);
      });
    });

    // console.log(comments);
  }, [locationId]);

  const sendPoint = (e, locationId) => {
    e.preventDefault();
    setDurum(false);

    earnPoint(JSON.stringify(point));
    postRatingAdd(locationId);
  };

  const [locationUser, setLocationUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const user = await getOneUser(location?.userId);
      console.log(user);
      setLocationUser(user);
    };
    getUser();
  }, [location]);

  console.log(locationUser);

  const gotoUser = (e, userId) => {
    e.preventDefault();
    console.log(userId);
    navigate('/User/' + userId, { replace: true });
  };

  return (
    <Container>
      <Row style={{ borderStyle: 'double' }}>
        <Row>
          <h1 style={{ textAlign: 'center' }}>İLAN BİLGİLERİ</h1>
        </Row>
        <Row>
          <Col>
            <img src={location.image} width='300' height='200' />
          </Col>
          <Col>
            <label>Adres : {location.adres}</label>
            <h2 style={{ textAlign: 'center', marginTop: 20 }}>
              İLAN PUANI :{location?.postRating} değerlendirme sayısı :(
              {location.ratingCount})
            </h2>
          </Col>
        </Row>
        <Row>
          <h5
            style={{ border: '1px solid', marginTop: 10 }}
            onClick={(e) => {
              gotoUser(e, location.userId);
            }}
            title='ilan sahibine git'
          >
            İlan sahibi : {locationUser?.name}
          </h5>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>Vermiş olduğunuz telefon numarası :{location.phone} </label>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>Adres tarifi :{location.likeLocation} </label>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>Yorumlarınız ve Bilgilendirme :{location.apartment} </label>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>
            Bina için yaptığınız değerlendirme puanı :{' '}
            {<Rating initialValue={location.apartmentRating} />}
          </label>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>Mülk sahibi hakında görüşleriniz : {location.owner} </label>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <label>
            Mülk sahibi için yaptığınız değerlendirme puanı :{' '}
            {<Rating initialValue={location.ownerRating} />}
          </label>
        </Row>
      </Row>
      <Row>
        <Col></Col>
        {durum ? (
          <Col>
            <label style={{ marginLeft: 10 }}>İlani puanlayabilirsiniz</label>
            <StarRating id={2} />
            <Button
              onClick={(e) => {
                return sendPoint(e, location._id);
              }}
              style={{ with: 20 }}
              className='primary'
            >
              Puanla
            </Button>
          </Col>
        ) : (
          <Col>
            {' '}
            <label style={{ marginLeft: 10 }}>
              Puanladığınız için teşekkerler :)
            </label>
          </Col>
        )}

        <Col></Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <ShowComment id={locationId} />
      </Row>
    </Container>
  );
};

export default Location;
