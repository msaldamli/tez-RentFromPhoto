/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { createNewLocation } from '../api/imagePost';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForComment = () => {
  const [ilanlar, setilanlar] = useState();
  const navigate = useNavigate();
  const [location] = useState({
    lat: localStorage.getItem('lat'),
    lng: localStorage.getItem('lng'),
  });
  // console.log(ilanlar);
  // console.log(location);
  useEffect(() => {
    toast.info(
      'Vermiş olduğunuz konuma çok yakın ilanlar bulunmakta bu ilanlardan biri olabilir mi?  ',
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

    toast.warn(
      'Yeni ilan için (Bu ilanlardan biri değil) butonuyla devam edebilirsiniz ',
      {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      }
    );
  }, []);

  useEffect(() => {
    const data = async () => {
      const result = await createNewLocation(location);
      console.log(result);

      await setilanlar(result.data);
    };

    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ilanlar?.length === 0) {
    // console.log('çalış');
    navigate('/AddNext');
  }

  // console.log(ilanlar.length);
  const handleClick = (e, locationId) => {
    e.preventDefault();
    console.log(locationId);
    navigate('/ForCommentNext/' + locationId, { replace: true });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/AddNext');
  };

  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: 'center' }}>YAKIN KONUMDAKİ İLANLAR </h1>
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
                      Lokasyonu seç
                    </Button>
                  </div>
                </div>
              </Row>
            </Col>
          );
        })}
      </Row>{' '}
      <Row style={{ marginTop: 20 }}>
        <button onClick={handleNext} className='btn btn-primary'>
          Bu ilanlanlardan biri değil !!
        </button>
      </Row>
    </Container>
  );
};

export default ForComment;
