import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../axios';

const initialState = {
  user: [],
  status: 'idle',
  error: null,
};

export const register = createAsyncThunk('user/register', async (body) => {
  try {
    const user = body.jsonUser;
    const response = await axios.post(
      `${api}/api/users/register`,
      { user },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const login = createAsyncThunk('user/login', async (body) => {
  try {
    const user = body.reqUser;
    const response = await axios.post(
      `${api}/api/users/login`,
      { user },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: {
      reducer(state, action) {
        console.log('logout');
        localStorage.removeItem('user');
        state.user = initialState;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));

      state.status = 'resolved';
      state.user.user = action.payload;
      console.log(action.payload);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
    builder.addCase(login.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.status = 'resolved';
      state.user.user = action.payload;
      console.log(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
  },
});

export const selectUsers = (state) => state.user.user;
export const { logout } = userSlice.actions;

export default userSlice.reducer;
