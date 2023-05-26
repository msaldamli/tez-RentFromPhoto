import React, { useEffect, useState } from 'react';
// import Tesseract from 'tesseract.js';
import Tesseract from 'tesseract.js';

const Teseract = () => {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = (e) => {
    e.preventDefault();
    // console.log(selectedImage);
    const urlImage = URL.createObjectURL(selectedImage);
    console.log(selectedImage);
    localStorage.setItem('Image', JSON.stringify(urlImage));
    // setSelectedImage();
  };

  useEffect(() => {
    // console.log('calıssssstım tesseract için ');
    const phoneinpicture = async () => {
      const image = document.getElementById('image');

      Tesseract.recognize(image, 'eng', {
        tessedit_char_whitelist: 'number',
      }).then(({ data: { text } }) => {
        console.log(text);
      });

      //   Tesseract.recognize(image, 'tur', {
      //     tessedit_char_whitelist: '1234567890',
      //     // logger: (m) => console.log(m),
      //   }).then(({ data: { text } }) => {
      //     console.log(text);
      //   });

      //   const result = await tesseract.recognize(image, {
      //     // load_system_dawg: 0,
      //     tessedit_char_whitelist: '0123456789',
      //     // presets: ['tsv'],
      //   });
      //   console.log(result);
    };

    phoneinpicture();
  }, [selectedImage]);

  return (
    <>
      <div style={styles.container}>
        <input accept='image/*' type='file' onChange={imageChange} />

        {selectedImage && (
          <div style={styles.preview}>
            <img
              id='image'
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt='Thumb'
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Teseract;

// Just some styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  image: { maxWidth: '100%', maxHeight: 320 },
  delete: {
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },
};
