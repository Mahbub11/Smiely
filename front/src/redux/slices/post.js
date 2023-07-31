// import { showSnackbar } from "./app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";
import { ShowsnackBar } from "../actions";
import { EditData } from "./postFunction";
// import { ShowsnackBar } from "../actions";
// import { showSnackbar } from "./app";
// import { showSnackbar } from "./app";

const initialState = {
  loading: false,
  error: null,
  post: [],
  totalPost:null,
  message:null,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // get the post of following user
    PostFollowingRequest: (state) => {
      state.loading = true;
    },
    PostFollowingSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.payload.posts;
      state.totalPost= action.payload.payload.totalPosts
    },
    PostFollowingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.payload;
    },
    PostFollowingReset: (state, action) => {
      state.post = [];
    },
    PostFollowingResetError: (state, action) => {
      state.loading = true;
      state.error = action.payload.payload;
    },

      // Like Post
      LikePostRequest: (state) => {
        state.loading = true;
      },
      LikePostRequestSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.payload.message;
        state.post=EditData(state.post,action.payload.payload.post._id,action.payload.payload.post)
       
      },
      LikePostRequestFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.payload;
      },
      // Comment Post
      CommentPostRequest: (state) => {
        state.loading = true;
      },
      CommentPostRequestSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.payload.message;
        state.post=EditData(state.post,action.payload.payload.post._id,action.payload.payload.post)
       
      },
      CommentPostRequestFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.payload;
      },
  },
  extraReducers:(builder)=>{
    builder
     //likepost
     .addCase(likePostThunk.pending,(state)=>{
      state.loading=true
  })
  .addCase(likePostThunk.fulfilled,(state,action)=>{
      state.loading = false;
      state.error=false;
      state.post = EditData(state.post,action.payload.post._id,action.payload.post)
      state.message= "Success"
 })
  .addCase(likePostThunk.rejected,(state,action)=>{
      console.log("err", action);
      state.loading=false;
      state.error=true;
      state.message='error'
  })
  }
});

// export the slice of reducer
export default slice.reducer;

export const getPostsOfFollowing =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch(slice.actions.PostFollowingRequest);

     
          await axios.get(
          `${API_LEVEL}/post/get-user-following-post?page=${page}`,
          {
            withCredentials: true,
          }
        ).then((response)=>{
          dispatch(
          slice.actions.PostFollowingSuccess({
            payload: response.data,
          })
        );
        console.log(response.data)
        });

        
        
     
    } catch (error) {
      console.log(error);
      dispatch(
        slice.actions.PostFollowingFail({
          payload: error.message,
        })
      );
    }
  };
export const postsOfFollowingReset = () => async (dispatch) => {
  try {
    dispatch(slice.actions.PostFollowingReset);
  } catch (error) {
    console.log(error);
    dispatch(
      slice.actions.PostFollowingResetError({
        payload: error.message,
      })
    );
  }
};
export const likePostThunk= createAsyncThunk('post/like',async(postId,thunkAPI)=>{

  
  try {
    const { data } = await axios.get(`${API_LEVEL}/post/like/${postId}`,{withCredentials:true});
  return data;
  
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }

})
export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch(slice.actions.LikePostRequest);
    const { data } = await axios.get(`${API_LEVEL}/post/like/${postId}`,{withCredentials:true});

   
    dispatch(
      slice.actions.LikePostRequestSuccess({
        payload: data,
      })
    );
    console.log(data.message)


  

  } catch (error) {
    console.log(error);
    dispatch(
      slice.actions.LikePostRequestFail({
        payload: error,
      })
    );
  }
};
// Add Comment
export const addComment = (postId, comment) => async (dispatch) => {
  try {

    dispatch(slice.actions.CommentPostRequest);
      const config = { header: { "Content-Type": "application/json" },withCredentials:true }
      const { data } = await axios.post(`${API_LEVEL}/post/comment/${postId}`, { comment }, config);

      
    dispatch(
      slice.actions.CommentPostRequestSuccess({
        payload: data,
      })
    );

  } catch (error) {
    dispatch(
      slice.actions.CommentPostRequestFail({
        payload: error,
      })
    );
  }
}