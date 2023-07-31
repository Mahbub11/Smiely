// import { showSnackbar } from "./app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";


const initialState = {
  loading: false,
  error: null,
  messages: [],
  
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // get the post of following user
    newMessageRequest: (state) => {
      state.loading = true;
    },
    newMessageSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload.payload.message;
    },
    newMessageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
    
  }
});

// export the slice of reducer
export default slice.reducer;

// Add New Message
export const sendMessage = (msgData) => async (dispatch) => {
  try {

    dispatch(slice.actions.newMessageRequest);
      const config = { header: { "Content-Type": "application/json" },withCredentials:true }
      const { data } = await axios.post(`${API_LEVEL}/message/new/`, msgData, config);

      
    dispatch(
      slice.actions.newMessageSuccess({
        payload: data.message,
      })
    );

  } catch (error) {
    dispatch(
      slice.actions.newMessageFail({
        payload: error,
      })
    );
    console.log(error)
  }
}