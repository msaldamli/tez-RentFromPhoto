import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap/';
import { logout } from '../api/features/userslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate('/Home');

    toast.error('Çıkış yaptınız !!   Sayfayı yenileyiniz', {
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
    localStorage.removeItem('user');
    dispatch(logout());
  };
  // const [number, setnumber] = useState();

  // useEffect(() => {
  //   const ilanlar = async () => {
  //     const parseUser = JSON.parse(user);
  //     const user_Id = parseUser._id;
  //     // console.log(user_Id);
  // const number = await numberOfLocations(user_Id);
  //     // console.log(number);
  //     setnumber(number);
  //   };
  //   ilanlar();
  // });

  // console.log(number);
  return (
    <Navbar bg='light'>
      <Container>
        <Navbar.Brand href='Home'>RENT FROM PHOTO</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='Home'>Ana Sayfa</Link>
            {user && <Nav.Link href='Add'>Yeni İlan</Nav.Link>}
            {user && <Nav.Link href='Profile'>Profil</Nav.Link>}
            <Nav.Link href='Leader'>Liderlik Tablosu</Nav.Link>

            {/* <Nav.link href='Add'>Yeni İlan </Nav.link> */}
            {/* {user && <Nav.Link href='MapPhoto'>Map&Photo</Nav.Link>} */}

            {/* <NavDropdown title='Hakımızda' id='basic-nav-dropdown'>
              <NavDropdown.Item href='login'>GİRİŞ YAP</NavDropdown.Item>
              <NavDropdown.Item href='About'>About</NavDropdown.Item>
              <NavDropdown.Item href='Comment'>Comment</NavDropdown.Item>
              <NavDropdown.Item href='Add'>Add </NavDropdown.Item> */}

            {/* <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item> */}
            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
            {/* </NavDropdown> */}
          </Nav>
          {/* <Nav className='me-2' style={{ backgroundColor: 'green' }}>
            {' '}
            ÜNVAN : {number}
          </Nav> */}
          {!user ? (
            <Nav.Link className='me-2' href='login'>
              GİRİŞ YAP
            </Nav.Link>
          ) : (
            <Nav.Link className='me-2' href='login' onClick={handleClick}>
              CIKIS YAP
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
