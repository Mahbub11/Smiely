// import { showSnackbar } from "./app";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowsnackBar } from "../actions";
import { userData } from "./userFunction";
// import { ShowsnackBar } from "../actions";
// import { showSnackbar } from "./app";
// import { showSnackbar } from "./app";

const initialState = {
  loading: true,
  error: null,
  follow: false,
  posts: null,
  savedPost: null,
  message: null,
  guestUser:[]
};

const slice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.guestUser = action.payload.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },

    // follow
    FollowUserRequest: (state) => {
      state.loading = true;
    },
    FollowUserSuccess: (state, action) => {
      state.loading = false;
      // console.log(state.guestUser.following[0])
      state.guestUser = action.payload.payload
    },
    FollowUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },

    // post crud
    NewPostRequest: (state) => {
      state.loading = true;
    },
    PostCreateSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    PostCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Save Post
    SavePostRequest: (state) => {
      state.loading = true;
    },
    SavePostRequestSuccess: (state, action) => {
      state.loading = false;
      state.savedPost = action.payload.payload;
    },
    SavePostRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Like Post
    LikePostRequest: (state) => {
      state.loading = true;
    },
    LikePostRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.payload;
    },
    LikePostRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },

    // New Chat
    newChatRequest: (state) => {
      state.loading = true;
    },
    newChatRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.payload;
    },
    newChatRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },

    // empty the userList
    
    ResetUserList:(state,action)=>{
      state.guestUser=[]
    }
    


  },
});

// export the slice of reducer
export default slice.reducer;

//  The Actions
export const resetUserList = () => async (dispatch) => {
  dispatch(
    slice.actions.ResetUserList()
  );

}
export const getUserDetails = (username) => async (dispatch) => {
  try {
 
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(
      `${API_LEVEL}/user/userdetails/${username}`
    );

    console.log(data.user);

    dispatch(
      slice.actions.LoadUserDetailsSuccess({
        payload: data.user,
      })
    );
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error,
    });
  }
};
export const getUserDetailsById = (userId) => async (dispatch) => {
  try {
 
   
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(
      `${API_LEVEL}/user/userdetails-by-id/${userId}`
    );

    console.log(data.user);

    dispatch(
      slice.actions.LoadUserDetailsSuccess({
        payload: data.user,
      })
    );
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error,
    });
  }
};
// Follow | Unfollow User
export const followUser = (userId) => async (dispatch) => {
  try {
    dispatch(slice.actions.FollowUserRequest());
    const { data } = await axios.get(`${API_LEVEL}/user/follow/${userId}`, {
      withCredentials: true,
    });

    console.log(data);
    dispatch(
      slice.actions.FollowUserSuccess({
        payload: data.user,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      slice.actions.FollowUserFail({
        payload: error.message,
      })
    );
  }
};

export const addNewPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: "NewPostRequest" });
    const config = { header: { "Content-Type": "application/json" } };
    // const { data } = await axios.post("/api/v1/post/new", postData, config);
    await axios
      .post(`${API_LEVEL}/post/createpost`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: "PostCreateSuccess",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    dispatch({
      type: "PostCreateFail",
      payload: error.response.data.message,
    });
  }
};

export const savePost = (postId) => async (dispatch) => {
  try {
    dispatch(slice.actions.SavePostRequest);
    const { data } = await axios.get(`${API_LEVEL}/post/${postId}`, {
      withCredentials: true,
    });

    dispatch(
      slice.actions.SavePostRequestSuccess({
        payload: data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SavePostRequestFail",
      payload: error.response,
    });
  }
};

// export const likePost = (postId) => async (dispatch) => {
//   try {
//     dispatch(slice.actions.LikePostRequest);
//     const { data } = await axios.get(`${API_LEVEL}/post/like/${postId}`,{withCredentials:true});

//     console.log(data)
//     dispatch(
//       slice.actions.LikePostRequestSuccess({
//         payload: data,
//       })
//     );
//   } catch (error) {
//     console.log(error);
//     dispatch(
//       slice.actions.LikePostRequestFail({
//         payload: error,
//       })
//     );
//   }
// };
