/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import profile from '../foto/profil.png';
import { userLocations } from '../api/imagePost';
import axios from 'axios';
import baseURL from '../axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userPost, setUserpost] = useState();

  useEffect(() => {
    const userLocat = async () => {
      const getUser = await userLocations(user._id);

      setUserpost(getUser);
    };
    userLocat();
    console.log();
  }, []);
  console.log(userPost);
  const navigate = useNavigate();

  const handleClick = async (e, locationId) => {
    e.preventDefault();
    console.log(locationId);
    const res = await axios.get(`${baseURL}/api/ads/` + locationId);
    console.log(res);
    navigate('/location/' + locationId, { replace: true });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className=' flex-column'>
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
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <h5>Telefon numaranız: {user.telefon}</h5>
          <h5>E-mail : {user.email}</h5>
        </Col>
        <Col>
          <h4>PUANINIZ : {user.userRating}</h4>
        </Col>
      </Row>
      <Row>
        {' '}
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
                    {ilan.comment != '' && (
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
};

export default Profile;
