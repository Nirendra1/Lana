import { createReducer } from '@reduxjs/toolkit';
// yha hmne lecture and course initial zero lie h
export const courseReducer = createReducer(
  { courses: [] ,lectures:[]},
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      // state.isAuthenticated=true;
      // state.user=action.payload.user;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      // state.isAuthenticated=false;
      state.error = action.payload;
    },

    getCoursesRequest: state => {
      state.loading = true;
    },
    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCoursesFail: (state, action) => {
      state.loading = false;
      // state.isAuthenticated=false;
      state.error = action.payload;
    },

    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      // state.isAuthenticated=false;
      state.error = action.payload.error;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
