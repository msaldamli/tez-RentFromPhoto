import React, { useEffect, useState } from 'react';
import './LeaderPage.css';
import { Col, Container, Row } from 'react-bootstrap';
import { getUsers } from '../api/api';
import { useNavigate } from 'react-router-dom';

const LeaderPage = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const userFind = async () => {
      const result = await getUsers();
      //   console.log(result);
      setUsers(result);
    };
    userFind();
  }, []);

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

  const navigate = useNavigate();

  const gotoUser = (e, userId) => {
    e.preventDefault();
    console.log(userId);
    navigate('/User/' + userId, { replace: true });
  };

  console.log(users);
  return (
    <Container>
      <Row style={{ backgroundColor: 'ButtonHighlight' }}>
        <h1 style={{ textAlign: 'center' }}>Liderlik Sıralaması </h1>
        <Col></Col>
        <Col xs={6}>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Sıra </th>
                <th style={{ textAlign: 'center' }}>İsim</th>
                <th>Puan</th>
                <th>Ünvan</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={user._id}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.userRating}</td>
                  <td>{title(user.userRating)}</td>
                  <td
                    onClick={(e) => {
                      gotoUser(e, user._id);
                    }}
                  >
                    kullanıcıya git
                  </td>
                  <td>{user._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default LeaderPage;
