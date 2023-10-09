import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';

import { courseReducer } from './reducers/courseReducer';
import { AdminReducer } from './reducers/Admin';
import { otherReducer } from './reducers/otherReducer';

const store = configureStore({
  //jb tk idhr ni likhoge redux edge pr dekhoge data recev ni hoga
  //jp state=>stae.x,likh rhe bo yha reducer ke age jo lia h bo likh rhe
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: AdminReducer,
    other:otherReducer
  },
});

export default store;

export const server = 'https://lana-backend.onrender.com/api/v1';
// export const server='http://127.0.0.1:4000/api/v1'

// export const server ='http://localhost:3000/api/v1'
