// import React, { useRef, useState, useCallback, useEffect } from 'react';
// import Webcam from 'react-webcam';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'leaflet/dist/leaflet.css';
// import { Col, Container, Row } from 'react-bootstrap';
// // import { useDispatch } from "react-redux";
// // import { addIlan } from "../api/features/locatslice";
// import { createNewLocation } from '../api/imagePost';
// import Map from '../components/Location/Map';
// // import { useNavigate } from 'react-router-dom';
// // import Tesseract from 'tesseract.js';
// // import axios from 'react-axios';
// // import { useSelector } from 'react-redux';

// const Camera = () => {
//   // const navigate = useNavigate();
//   const videoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: 'user',
//   };
//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user._id;
//   const [adress, setAdres] = useState();

//   // console.log(adress);
//   const [picLocation, setPicLocation] = useState({
//     userId: userId,
//     lat: localStorage.getItem('lat'),
//     lng: localStorage.getItem('lng'),
//     phone: '',
//     comment: '',
//     image: '',
//     adres: localStorage.getItem('adres'),
//   });

//   useEffect(() => {
//     fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${localStorage.getItem(
//         'lat'
//       )}&lon=${localStorage.getItem('lng')}&format=json`,
//       {
//         headers: {
//           'User-Agent': 'ID of your APP/service/website/etc. v0.1',
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         setAdres(res.display_name);
//         localStorage.setItem('adres', res.display_name);
//       });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     setPicLocation({
//       ...picLocation,
//       image: JSON.parse(localStorage.getItem('pic')),
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [localStorage.getItem('pic')]);

//   const commentAdd = (e) => {
//     setPicLocation({ ...picLocation, [e.target.name]: e.target.value });
//   };

//   const [picture, setPicture] = useState([]);
//   const [Phone, setPhone] = useState([]);

//   const [ads, setAds] = useState({
//     lat: localStorage.getItem('lat'),
//     lng: localStorage.getItem('lng'),
//   });

//   useEffect(() => {
//     console.log(ads);
//     const location = async () => {
//       const res = await createNewLocation(ads);
//       console.log(res);
//     };
//     location();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // useEffect(() => {
//   //   // console.log('calıssssstım tesseract için ');
//   //   const phoneinpicture = async () => {
//   //     const image = document.getElementById('image');
//   //     const result = await Tesseract.recognize(image, 'eng');
//   //     // console.log(result.data.text, +'1111111111111');
//   //     const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
//   //     const phonenumber = result.data.text.match(phoneRegex);
//   //     // console.log(
//   //     //   phonenumber +
//   //     //     '  telephone numarası burada bulunmakatadır !!!!!!!!!!!!!!!!i'
//   //     // );
//   //     setPhone(phonenumber);
//   //     setPicLocation({ ...picLocation, phone: Phone });
//   //   };

//   //   phoneinpicture();
//   // }, [picture]);

//   const [oversizedPicture, setOversizedPicture] = useState(false);
//   const overSizeNotify = () => toast('Maksimum 2 adet fotoğraf çekebilirsiniz');
//   const webcamRef = useRef(null);
//   localStorage.setItem('picture', JSON.stringify(picture));

//   const handleDelete = (pic) => {
//     const newPictures = picture.filter((p, idx) => idx !== pic);
//     setPicture(newPictures);
//   };
//   const capture = useCallback(() => {
//     const pictureSrc = webcamRef.current.getScreenshot();
//     let obj = { label: `${pictureSrc}` };
//     // console.log(pictureSrc);
//     localStorage.setItem('pic', JSON.stringify(pictureSrc));

//     // eslint-disable-next-line eqeqeq
//     if (picture.length == 1) {
//       // 2 yi 1 olarak değiştirdim
//       setOversizedPicture(true);
//       overSizeNotify();
//     } else {
//       setPicture([...picture, pictureSrc]);
//     }
//   }, [picture]);
//   useEffect(() => {
//     if (picture.length < 2) {
//       // 3 yi 2 olarak değiştirdim
//       // console.log(picture.length);
//       setOversizedPicture(false);
//     }
//     // eslint-disable-next-line eqeqeq
//     if (picture.length == 1) {
//       // 2 yi 1 olarak değiştirdim
//       setOversizedPicture(true);
//     }
//   }, [picture]);

//   const handleSend = async (e) => {
//     try {
//       e.preventDefault();
//       console.log(picLocation);
//       // const jsonLocation = picLocation;
//       // const res = await createNevImage(jsonLocation);

//       // await localStorage.setItem('ilan_id', res.data.message._id);

//       // if (res?.status === 200) {
//       //   navigate('/Comment');
//       // } else {
//       //   navigate('/Home');
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container>
//       <ToastContainer />
//       <Row className=' '>
//         <Col></Col>
//         <Col xs={6} style={{ height: 400 }}>
//           <Map />
//         </Col>
//         <Col></Col>
//       </Row>

//       <Row className=''>
//         <Col sm={4}>
//           <div style={{ marginTop: 50 }}>
//             <Webcam
//               className='img'
//               style={oversizedPicture ? { opacity: 0.5 } : { opacity: 1 }}
//               audio={false}
//               mirrored={false}
//               ref={webcamRef}
//               screenshotFormat='image/jpeg'
//               videoConstraints={videoConstraints}
//               screenshotQuality={1}
//             />
//           </div>

//           <div className=' flex-column'>
//             <button
//               disabled={oversizedPicture}
//               onClick={(e) => {
//                 e.preventDefault();
//                 capture();
//               }}
//               className='btn btn-primary'
//             >
//               Fotoğraf çek
//             </button>
//           </div>
//         </Col>
//         <Col sm={4}>
//           <div className='' style={{ marginTop: 50 }}>
//             {picture.map((p, i) => {
//               // console.log(i);
//               return (
//                 <div key={i}>
//                   <img id='image' className='img' alt='' src={p} />
//                   <button
//                     className='btn btn-danger'
//                     onClick={(e) => {
//                       // localStorage.removeItem('pic');
//                       localStorage.removeItem('pic');
//                       // console.log(e);
//                       e.preventDefault();
//                       return handleDelete(i);
//                     }}
//                   >
//                     sil
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </Col>
//         <Col>
//           <div className='form-group'>
//             <div className='form-group mt-3'>
//               <label>Telefon Numarası</label>
//               <input
//                 name='phone'
//                 type='email'
//                 className='form-control mt-1'
//                 placeholder='Telefon numarasını giriniz'
//                 onChange={commentAdd}
//               />
//             </div>

//             <label for='exampleFormControlTextarea1'>Bilgi</label>
//             <textarea
//               name='comment'
//               onChange={commentAdd}
//               className='form-control mb-5'
//               id='exampleFormControlTextarea1'
//               placeholder='bilgi veriniz'
//               rows='3'
//             ></textarea>
//             {/* <button className="btn btn-primary">Add Comment</button> */}
//           </div>
//         </Col>
//       </Row>
//       <Row className='mt-5' style={{ backgroundColor: '' }}>
//         <button onClick={handleSend} className='btn btn-primary'>
//           Yükle
//         </button>
//       </Row>
//     </Container>
//   );
// };

// export default Camera;
