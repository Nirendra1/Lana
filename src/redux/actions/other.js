
import { server } from '../store';
import axios from 'axios';

export const contactUs = (name,email,message) => async dispatch => {
    try {
      //content typ ejarurat ke hisab se alg hota h
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };
      dispatch({ type: 'contactRequest' });
      //backend se lia data aur bhej dia,name email bgerh
      const { data } = await axios.post(`${server}/contact`,{name,email,message },config);
      dispatch({ type: 'contactRequestSuccess', payload: data.messege });
    } catch (error) {
      dispatch({
        type: 'contactRequestFail',
        payload: error.response.data.messege,
      });
    }
  };

  //yha bahi ayga jo backend se dia h,like mail name course
export const courseRequest = (name,email,course) => async dispatch => {
    try {
      //content typ ejarurat ke hisab se alg hota h
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      };
      dispatch({ type: 'CourseRequest' });
      //backend se lia data aur bhej dia,name email bgerh
      const { data } = await axios.post(`${server}/courserequest`,{name,email,course },config);


      dispatch({ type: 'CourseRequestSuccess', payload: data.messege });
    } catch (error) {
      dispatch({
        type: 'CourseRequestFail',
        payload: error.response.data.messege,
      });
    }
  };