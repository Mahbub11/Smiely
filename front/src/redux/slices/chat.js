// import { showSnackbar } from "./app";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";

const initialState = {
  loading: true,
  error: null,
  chat:[],
  chatUserList:[]
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    newChatRequest: (state) => {
      state.loading = true;
    },
    newChatRequestSuccess: (state, action) => {
      state.loading = false;
      state.chat = action.payload.payload;
    },
    newChatRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
    chatUserListRequest: (state) => {
        state.loading = true;
      },
      chatUserListRequestSuccess: (state, action) => {
        state.loading = false;
        state.chatUserList = action.payload.payload;
      },
      chatUserListFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.payload;
      },

   

  },
});

// export the slice of reducer
export default slice.reducer;

export const addNewChat = (userId) => async (dispatch) => {

  try {

    dispatch(slice.actions.newChatRequest);
    const config = { header: { "Content-Type": "application/json" },withCredentials:true }
    const { data } = await axios.post(`${API_LEVEL}/message/newChat`, { receiverId: userId }, config);

    dispatch(slice.actions.newChatRequestSuccess({
      payload: data.newChat
    }));
    console.log(data)

} catch (error) {
  console.log(error);
  dispatch(
    slice.actions.newChatRequestFail({
      payload: error.message,
    })
  );
}
}
export const getMyChatList = (userId) => async (dispatch) => {

    try {
  
      dispatch(slice.actions.newChatRequest);
      const config = { header: { "Content-Type": "application/json" },withCredentials:true }
      const { data } = await axios.get(`${API_LEVEL}/message/chatList`, config);
  
      dispatch(slice.actions.chatUserListRequestSuccess({
        payload: data.chatUser
      }));
      console.log(data)
  
  } catch (error) {
    console.log(error);
    dispatch(
      slice.actions.newChatRequestFail({
        payload: error.message,
      })
    );
  }
  
  }