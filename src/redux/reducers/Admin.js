import { createReducer } from '@reduxjs/toolkit';
export const AdminReducer = createReducer(
  {},
  {
    getAdminStatesRequest: state => {
      state.loading = true;
    },
    getAdminStatesSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.usersCount = action.payload.usersCount;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.userPercentage = action.payload.userPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.userProfit = action.payload.userProfit;
      state.viewsProfit = action.payload.viewsProfit;
    },
    getAdminStatesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUsersRequest: state => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUsersRoleRequest: state => {
      state.loading = true;
    },
    updateUsersRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateUsersRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUsersRequest: state => {
      state.loading = true;
    },

    deleteUsersSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createCourseRequest: state => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: state => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addLectureRequest: state => {
      state.loading = true;
    },

    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteLectureRequest: state => {
      state.loading = true;
    },

    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
