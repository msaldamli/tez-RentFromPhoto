import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import WebCam from '../components/Add/WebCam';
import { createNewLocation } from '../api/imagePost';
import Map from '../components/Location/Map';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info(
      'İlan için konum ve fotoğraf eklemek size 20 puan kazandıracak ',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      }
    );
    const locationLat = localStorage.getItem('lat');
    const locationLong = localStorage.getItem('lng');
    setLocation({ lat: locationLat, lng: locationLong });
  }, []);

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const handleNext = async (e) => {
    try {
      if (location.lat === null && location.lng === null) {
        location.lat = localStorage.getItem('lat');
        location.lng = localStorage.getItem('lng');
        console.log(location);
      }

      console.log(location);
      const result = await createNewLocation(location);
      e.preventDefault();
      console.log('calistim');
      console.log(result.data);

      // eslint-disable-next-line eqeqeq
      if (result.data.length == 0) {
        console.log('ayni konumda ilan yok ');
        navigate('/AddNext');
      } else {
        console.log('bukonuma yakin ilan sayisi :  ' + result.data.length);
        navigate('/ForComment');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row className=' '>
        <Col></Col>
        <Col xs={6} style={{ height: 360, marginTop: 20 }}>
          <Map />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <WebCam />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <button onClick={handleNext} className='btn btn-primary'>
          Sonraki
        </button>
      </Row>
    </Container>
  );
};

export default Add;
