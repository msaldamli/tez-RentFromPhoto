/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../axios';
import { Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

const ShowComment = (ilanId) => {
  const [yorumlar, SetYorumlar] = useState();

  useEffect(() => {
    const getComment = async () => {
      const comment = await axios.get(`${baseURL}/api/comments/` + ilanId.id);
      SetYorumlar(comment.data);

      return comment.data;
    };
    getComment();
  }, [ilanId]);

  return (
    <Container>
      {yorumlar?.map((yorum, i) => {
        return (
          <Row key={i} style={{ borderStyle: 'double' }}>
            <h1 style={{ textAlign: 'center' }}>YORUMLAR</h1>

            <Row>
              <Col>
                <img src={yorum.image} width='300' height='200' />
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}></Row>
            <Row style={{ marginTop: 10 }}>
              <label>Adres tarifi :{yorum.likelocation} </label>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <label>Yorumlarınız ve Bilgilendirme :{yorum.apartment} </label>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <label>
                Bina için yaptığınız değerlendirme puanı :{' '}
                {<Rating initialValue={yorum.apartmentRating} />}
              </label>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <label>Mülk sahibi hakında görüşleriniz : {yorum.owner} </label>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <label>
                Mülk sahibi için yaptığınız değerlendirme puanı :{' '}
                {<Rating initialValue={yorum.ownerRating} />}
              </label>
            </Row>
          </Row>
        );
      })}
    </Container>
  );
};

export default ShowComment;
