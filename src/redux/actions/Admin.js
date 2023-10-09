import { server } from '../store';
import axios from 'axios';
export const createCourse = formData => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      config
    );
    dispatch({ type: 'createCourseSuccess', payload: data.messege });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.messege,
    });
  }
};
export const deleteCourse = id => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${server}/course/${id}`, config);

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    dispatch({ type: 'addLectureRequest' });

    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      config
    );

    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFail',
      payload: error.response.data.message,
    });
  }
};
export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };
    dispatch({ type: 'deleteLectureRequest' });
    //as a query bheji h hmne
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      config
    );
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};
export const getAllUsers = () => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'getAllUsersRequest' });

    //as a query bheji h hmne
    const { data } = await axios.get(`${server}/admin/users`, config);
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFail',
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'updateUsersRoleRequest' });

    //as a query bheji h hmne,ye khali object lena jauri h {}ye
    const { data } = await axios.put(`${server}/admin/user/${id}`, {}, config);
    dispatch({ type: 'updateUsersRoleSuccess', payload: data.messege });
  } catch (error) {
    dispatch({
      type: 'updateUsersRoleFail',
      payload: error.response.data.messege,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'deleteUsersRequest' });

    //as a query bheji h hmne,ye khali object lena jauri h {}ye
    const { data } = await axios.delete(`${server}/admin/user/${id}`, config);
    console.log(data);
    dispatch({ type: 'deleteUsersSuccess', payload: data.messege });
  } catch (error) {
    dispatch({
      type: 'deleteUsersFail',
      payload: error.response.data.messege,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    //content typ ejarurat ke hisab se alg hota h
    const config = {
      withCredentials: true,
    };

    dispatch({ type: 'getAdminStatesRequest' });

    //as a query bheji h hmne,ye khali object lena jauri h {}ye
    const { data } = await axios.get(`${server}/admin/stats`, config);
    console.log(data);
    dispatch({ type: 'getAdminStatesSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatesFail',
      payload: error.response.data.messege,
    });
  }
};
