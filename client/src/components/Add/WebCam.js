import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

const WebCam = () => {
  const isMobileDevice = () => {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  };
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isMobileDevice() ? 'environment' : 'user',
  };

  const [oversizedPicture, setOversizedPicture] = useState(false);
  const [picture, setPicture] = useState([]);

  const overSizeNotify = () => toast('Maksimum 2 adet fotoğraf çekebilirsiniz');

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    // let obj = { label: `${pictureSrc}` };
    // console.log(pictureSrc);
    localStorage.setItem('pic', JSON.stringify(pictureSrc));

    if (picture.length == 1) {
      // 2 yi 1 olarak değiştirdim
      setOversizedPicture(true);
      overSizeNotify();
    } else {
      setPicture([...picture, pictureSrc]);
    }
  }, [picture]);

  const handleDelete = (pic) => {
    const newPictures = picture.filter((p, idx) => idx !== pic);
    setPicture(newPictures);
  };

  useEffect(() => {
    if (picture.length < 2) {
      // 3 yi 2 olarak değiştirdim
      // console.log(picture.length);
      setOversizedPicture(false);
    }
    if (picture.length == 1) {
      // 2 yi 1 olarak değiştirdim
      setOversizedPicture(true);
    }
  }, [picture]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <div style={{ marginTop: 10 }}>
            <Webcam
              className='img'
              style={oversizedPicture ? { opacity: 0.5 } : { opacity: 1 }}
              audio={false}
              mirrored={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
              screenshotQuality={1}
            />
          </div>

          <div className=' flex-column'>
            <button
              disabled={oversizedPicture}
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className='btn btn-primary'
            >
              Fotoğraf çek
            </button>
          </div>
        </Col>
        <Col sm={4}>
          <div className='' style={{ marginTop: 10 }}>
            {picture.map((p, i) => {
              // console.log(i);
              return (
                <div key={i}>
                  <img id='image' className='img' alt='' src={p} />
                  <button
                    className='btn btn-danger'
                    onClick={(e) => {
                      // localStorage.removeItem('pic');
                      localStorage.removeItem('pic');
                      // console.log(e);
                      e.preventDefault();
                      return handleDelete(i);
                    }}
                  >
                    sil
                  </button>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WebCam;
