/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneUser } from '../api/api';
import Title from '../components/Title';
import profile from '../foto/profil.png';
import { userLocations } from '../api/imagePost';
import baseURL from '../axios';
import axios from 'axios';

const User = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPost, setUserpost] = useState(null);

  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    const getUser = async () => {
      const user = await getOneUser(userId);
      console.log(user);
      setUser(user);
    };
    getUser();
  }, []);
  useEffect(() => {
    const userLocat = async () => {
      console.log(user);
      const getUser = await userLocations(user._id);

      setUserpost(getUser);
    };
    if (user != null) {
      userLocat();
    }
  }, [user]);

  const handleClick = async (e, locationId) => {
    e.preventDefault();
    console.log(locationId);
    const res = await axios.get(`${baseURL}/api/ads/` + locationId);
    console.log(res);
    navigate('/location/' + locationId, { replace: true });
  };

  if (user === null) {
    console.log('yükleniyor');
    return <div>Yükleniyor...</div>;
  } else {
    console.log(user);
    console.log(userPost);

    return (
      <Container>
        <Row>
          <h3 style={{ textAlign: 'center' }}>Kullanıcı Sayfası</h3>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <img
              style={{
                height: 100,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className='card-img-top'
              src={profile}
              alt='Card image cap'
            ></img>
            <h4> {user.name}</h4>
            <Title value={user.userRating} />
            <label style={{ display: 'block' }}>
              Telefon : {user.telefon}{' '}
            </label>
            <label style={{ display: 'block' }}>Email : {user.email}</label>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          {userPost?.map((ilan, i) => {
            //getAddress(ilan.lat, ilan.lng);
            return (
              <Col key={i}>
                <Row className='mt-4 p-4'>
                  {/* {console.log(i)} */}
                  <div className='card p-2' style={{ width: '20rem' }}>
                    <img
                      className='card-img-top'
                      src={ilan.image}
                      alt='Card image cap'
                    />
                    <div className='card-body'>
                      {ilan.comment !== '' && (
                        <h5 className='card-title'>
                          Telefon Numarasi : {ilan.phone}
                        </h5>
                      )}
                      <p className='card-text'>{ilan.comment}</p>
                    </div>
                    <div className={'card-footer'}>
                      <h5 className='card-title'>Adres:</h5>
                      <p className='card-text'>{ilan.adres}</p>
                      <Button
                        className={'btn-primary'}
                        onClick={(e) => {
                          return handleClick(e, ilan._id);
                        }}
                      >
                        Lokasyona Git
                      </Button>
                    </div>
                  </div>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
};

export default User;
