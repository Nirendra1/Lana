import { server } from '../store';
import axios from 'axios';

export const getAllCourses = (category='',keyword='')=> async dispatch => {
    try {

    dispatch({ type: 'allCoursesRequest' });
  
      const { data } = await axios.get (`${server}/courses?keyword=${keyword}&&category=${category}`,
      )
        // {
        //   headers: {
        //     'Content-type': 'multipart/form-data',
        //   },
        //   withCredentials: true,
        //   //cookies ko true kia
        // }//heders login bale pr ke lie resrtriction lgate h like bo login ho tb hi ho ye sb
  
      dispatch({ type: 'allCoursesSuccess', payload: data.courses});
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

  
export const getCourseLectures = id => async dispatch => {
  try {

  dispatch({ type:'getCoursesRequest' });

    const {data} = await axios.get(`${server}/course/${id}`,
      {
        withCredentials:true,
      });

      // console.log(data);
    dispatch({ type:'getCoursesSuccess', payload:data.lectures});
  } catch (error) {
    dispatch({
      type:'getCoursesFail',
      payload: error.response.data.message,
    });
  }
};

  