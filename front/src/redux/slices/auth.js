// import { showSnackbar } from "./app";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowsnackBar } from "../actions";
// import { ShowsnackBar } from "../actions";
// import { showSnackbar } from "./app";
// import { showSnackbar } from "./app";

const initialState = {
  isAuthenticated: false,
  loading: true,
  error: null,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
      state.isAuthenticated = false;
    },
  },
});

// export the slice of reducer
export default slice.reducer;

//  The Actions
export const RegisterUser = (userData) => async (dispatch) => {
  try {

   
    dispatch({
      type: "LoadUserRequest",
    });

    axios
      .post("http://localhost:3006/api/v1/auth/create-user", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'LoadUserSuccess',
          payload: res.user,
      });
      })
      .catch((err) => {
        console.log(err.message);
      //   dispatch({
      //     type: 'LoadUserFail',
      //     payload: err.message,
      // });
      dispatch(
        slice.actions.LoadUserSuccess({
          payload: err.message
        })
     );
      });

      
  } catch (error) {
    console.log(error);
    dispatch({
        type: 'LoadUserFail',
        payload: error.response.data.message,
    });
  }
};

export const LoginUser = (email,password) => async (dispatch) => {
  try {
    await axios
      .post(
        `${API_LEVEL}/auth/login`,
        {
          email,password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.LoadUserSuccess({
            payload: response.data.user,
          })
        );

        console.log(response.data);

        dispatch(
          ShowsnackBar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        dispatch({
          type: "LoadUserFail",
          payload: error,
        });
        dispatch(ShowsnackBar({ severity: "error", message: error.message }));
      });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error,
    });
  }
};
