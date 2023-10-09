import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },

      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
        //cookies ko true kia
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    //     console.log(error)
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
}; 

export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`,
     formdata,
      {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
      //cookies ko true kia
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    //     console.log(error)
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
        //cookies ko true kia
      }
    );

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    //     console.log(error)
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(
      `${server}/logout`,

      {
        withCredentials: true,
        //cookies ko true kia
      }
    );

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    //     console.log(error)
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};
export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

//     const { data } = await axios.get(
//       `${server}/subscribe`,
// {  withCredentials: true,}
//   //cookies ko true kia }
//       );
      axios.get(
        `${server}/subscribe`,
      {  withCredentials: true,}
        ).then((data) =>{
          // console.log(data)
          
          dispatch({ type: 'buySubscriptionSuccess', payload: {sub:data.data.subscriptionId} });
          // console.log('here')
        })
    //  console.log(data)
  } catch (error) {
    //     console.log(error)
    dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
  }
}; 


export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type:'cancelSubscriptionRequest' });

//     const { data } = await axios.get(
//       `${server}/subscribe`,
// {  withCredentials: true,}
//   //cookies ko true kia }
//       );
      axios.delete(
        `${server}/subscription/cancel`,
      {  withCredentials: true,}
        ).then((data) =>{
            // console.log(data)
            // console.log(data.data.messege)
          dispatch({ type:'cancelSubscriptionSuccess', payload: data.data.messege });
        })
      // console.log(data)
  } catch (error) {
    //     console.log(error)
    dispatch({ type:'cancelSubscriptionFail', payload:error.response.data.messege });
  }
}; 