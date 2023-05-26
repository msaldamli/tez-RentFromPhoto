import React, { useEffect, useState } from 'react';

const Title = (props) => {
  const [sendTitle, setSendTitle] = useState('');
  //   console.log(props);

  useEffect(() => {
    if (props.value === 0) {
      setSendTitle('Yeni kullanıcı');
    } else if (props.value > 0 && props.value <= 75) {
      setSendTitle('Emlak Araştırmacısı');
    } else if (props.value > 75 && props.value <= 150) {
      setSendTitle('Emlak fotoğrafçısı');
    } else if (props.value > 150 && props.value <= 225) {
      setSendTitle('Emlak pazarlama uzmanı');
    } else if (props.value > 225 && props.value <= 300) {
      setSendTitle('Emlak Teknik Uzmanı');
    } else if (props.value > 300 && props.value <= 375) {
      setSendTitle('Emlak Müşaviri');
    } else if (props.value > 375 && props.value <= 450) {
      setSendTitle('Emlak Danışmanı');
    } else if (props.value > 450 && props.value <= 525) {
      setSendTitle('Emlak Uzmanı');
    } else if (props.value > 525 && props.value <= 600) {
      setSendTitle('Emlak Profesyoneli');
    } else if (props.value > 600 && props.value <= 675) {
      setSendTitle('Emlak Yöneticisi');
    } else if (props.value > 675) {
      setSendTitle('Emlak Tasarımcısı');
    }
  }, [props.value]);
  //   console.log(sendTitle);
  return <div>Ünvan : {sendTitle}</div>;
};

export default Title;
