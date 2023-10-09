import { server } from '../store';
import axios from 'axios';
export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const { data} = await axios.put(
      `${server}/updateprofile`,
      { name, email },

      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
        //cookies ko true kia
      }
    );
// 
// console.log(data.message)
    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProfilePicture = formdata => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });

    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formdata,

      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        withCredentials: true,
        //cookies ko true kia
      }
    );//yha backend se nikalkr rreducer m meesage ka jo bhi varible loge usme state sab hogi bhai se ap main file m nikaloge usi ka use krke
    // console.log(data)
    dispatch({ type: 'updateProfilePictureSuccess', payload: data.mssage });
  } catch (error) {
    dispatch({
      type: 'updateProfilePictureFail',
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    const { data } = await axios.put(
      `${server}/changepassword`,
      { oldPassword, newPassword },

      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
        //cookies ko true kia
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = email => async dispatch => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });
    //as bhhi kr skt h
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
      //cookies ko true kia
    };

    const { data } = await axios.post(
      `${server}/forgetpassword`,
      { email },
      config
    );

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      { password },

      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
        //cookies ko true kia
      }
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const addToPlaylist = id => async dispatch => {
  dispatch({ type: ' addToPlaylistRequest' });
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
    //cookies ko true kia
  };
  // const { data } = await axios.post(
  //   `${server}/addtoplaylist`,{
  //     id,
  //   },config
  // );
  axios
    .post(
      `${server}/addtoplaylist`,
      {
        id,
      },
      config
    )
    .then(data => {
      // console.log(data);
      dispatch({ type: 'addToPlaylistSuccess', payload: data.data.message });
    })
    .catch(err => {
      // console.log(err);
      dispatch({
        type: 'addToPlaylistFail',
        payload: { error: err.response.data.message },
      });
    });
};

export const removeFromPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });
    const config = {
      withCredentials: true,
      //cookies ko true kia
    };

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,

      config
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response.data.message,
    });
  }
};
