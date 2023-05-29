/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../axios';
import { toast } from 'react-toastify';
import { getUsers } from '../api/api';
import profile from '../foto/profil.png';

const Home = () => {
  // const [a, setA] = useState(0);
  const [ilanlar, setilanlar] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    toast.info('Anasayfaya Hoş geldiniz', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    localStorage.removeItem('owner');
    localStorage.removeItem('pic');
    localStorage.removeItem('sahip');
    localStorage.removeItem('lng');
    localStorage.removeItem('apartment');
    localStorage.removeItem('toggle');
    localStorage.removeItem('bina');
    localStorage.removeItem('lat');
    localStorage.removeItem('adres');
    localStorage.removeItem('phone');
    localStorage.removeItem('likeLocation');
    localStorage.removeItem('postRating');
  }, []);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${baseURL}/api/ads/`);
      console.log(response);
      setilanlar(response.data);
    };
    data();
  }, []);

  const handleClick = async (e, locationId) => {
    e.preventDefault();
    console.log(locationId);
    const res = await axios.get(`${baseURL}/api/ads/` + locationId);
    console.log(res);
    navigate('/location/' + locationId, { replace: true });
  };

  const [users, setUsers] = useState();

  useEffect(() => {
    const userFind = async () => {
      const result = await getUsers();
      // console.log(result);
      setUsers(result);
    };
    userFind();
  }, []);
  const user = users;
  // console.log(user);
  // console.log(user.name);

  const title = (rating) => {
    if (rating === 0) {
      return 'Yeni kullanıcı';
    } else if (rating <= 75) {
      return 'Emlak Araştırmacısı';
    } else if (rating <= 150) {
      return 'Emlak fotoğrafçısı';
    } else if (rating <= 225) {
      return 'Emlak pazarlama uzmanı';
    } else if (rating <= 300) {
      return 'Emlak Teknik Uzmanı';
    } else if (rating <= 375) {
      return 'Emlak Müşaviri';
    } else if (rating <= 450) {
      return 'Emlak Danışmanı';
    } else if (rating <= 525) {
      return 'Emlak Uzmanı';
    } else if (rating <= 600) {
      return 'Emlak Profesyoneli';
    } else if (rating <= 675) {
      return 'Emlak Yöneticisi';
    } else {
      return 'Emlak Tasarımcısı';
    }
  };

  const gotoLeader = (e, userId) => {
    e.preventDefault();
    console.log(userId);
    navigate('/LeaderUser/' + userId, { replace: true });
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const divStyle = {
    cursor: isHovered ? 'pointer' : 'default',
    backgroundColor: isHovered ? 'purple' : 'white',
    borderRadius: '10px',
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className=' flex-column' style={{ marginTop: 10 }}>
          <h3 style={{ textAlign: 'center' }}>Lider</h3>

          {user?.map((userLeader, i) => {
            if (i === 0) {
              return (
                <Col
                  key={i}
                  onClick={(e) => {
                    return gotoLeader(e, userLeader._id);
                  }}
                  style={divStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
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
                  <h4> {userLeader.name}</h4>
                  <h4>{title(userLeader.userRating)}</h4>
                </Col>
              );
            }
          })}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        {ilanlar?.map((ilan, i) => {
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

export default Home;
