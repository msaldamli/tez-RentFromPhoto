import axios from 'axios';
import baseURL from '../axios';

export const createComment = async (yorum) => {
  try {
    console.log(yorum);
    const newComment = JSON.stringify(yorum);
    console.log(newComment);
    const res = await axios.post(
      `${baseURL}/api/comments/createComment`,
      newComment,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const findLocations = async (location) => {
  try {
    console.log(location);
    const sendlocation = JSON.stringify(location);
    console.log(sendlocation);
    const res = await axios.post(
      `${baseURL}/api/ads/findForComent`,
      { sendlocation },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
