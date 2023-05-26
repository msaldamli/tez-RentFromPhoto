import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/api/features/userslice';
// import locatReducer from '../src/api/features/locatslice';

export default configureStore({
  reducer: {
    user: userReducer,
    // locat: locatReducer,
  },
});
