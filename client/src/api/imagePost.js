import axios from 'axios';
import baseURL from '../axios';

export const createNevImage = async (Image) => {
  try {
    console.log(Image);
    const newImage = JSON.stringify(Image);

    const res = await axios.post(
      `${baseURL}/api/ads/createLocation`,
      newImage,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const allLocations = async () => {
  try {
    const locations = await axios.get(`${baseURL}/api/ads/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(locations.data);
    return locations.data;
  } catch (error) {
    console.log(error);
  }
};

export const createNewLocation = async (add) => {
  try {
    // console.log(add);
    const adds = JSON.stringify(add);
    // console.log(adds);
    const res = await axios.post(`${baseURL}/api/ads/getFindLocation`, adds, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postRatingAdd = async (ilanId) => {
  try {
    const postRating = localStorage.getItem('postRating');
    console.log(postRating);
    console.log(ilanId);

    const response = await axios.put(
      `${baseURL}/api/ads/` + ilanId,
      { postRating },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const userLocations = async (userId) => {
  try {
    // const user = JSON.stringify(userId);

    const response = await axios.post(
      `${baseURL}/api/ads/getUserLocation`,
      { userId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
