import axios from 'axios';
import baseURL from '../axios';

export const createNewUser = async (user) => {
  try {
    const newUser1 = JSON.stringify(user);
    const res = await axios.post(
      `${baseURL}/api/users/register`,
      { newUser1 },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(res.data.user);
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};
export const login = async (user) => {
  try {
    console.log(user, '12345678');
    const user1 = JSON.stringify(user);

    const res = await axios.post(
      `${baseURL}/api/users/login`,
      { user1 },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};
export const earnPoint = async (point) => {
  try {
    console.log(point);
    const response = await axios.post(
      `${baseURL}/api/users/earnPoint`,
      { point },
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/users`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = async (userId) => {
  try {
    console.log(userId);
    const response = await axios.post(
      `${baseURL}/api/users/getOneUser`,
      { userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
