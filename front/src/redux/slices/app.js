import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import {ClosesnackBar, ShowsnackBar,ToggleSideBar,ToggleBlury,CheckOutType, ToggleMode} from '../actions'
import axios from "../../utils/axios";
import { API_LEVEL } from "../../config";

// ----------------------------------------------------------------------

const initialState = {
  common:{
    shopInfo:null,
    loading:true,
    error:null,
    blury:false,
    dark:false
  },
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  sidebar: {
     sidebarBehaviour: null,
     type: "CART", // can be CONTACT, STARRED, SHARED
  },
  checkOut: {
    behaviour: null,
    type: "SHIPPING", // can be CONTACT, STARRED, SHARED
 },

 
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {

    LoadShopRequest:(state)=>  {
      state.loading = true;
    },
    LoadShopSuccess:(state, action)=>  {
      state.loading = false;
      state.shopInfo = action.payload;
    },
    LoadShopFail:(state, action)=> {
      state.loading = false;
      state.error = action.payload;
    },

    // toggleSideBar(state,action) {
    //   state.sideBar.open = !state.sideBar.open;
    //   state.sideBar.type = action.payload.type;
      
    // },
    // updateSideBarType(state,action) {
    //   state.sideBar.type = action.payload.type;
    // },

    
  },

  extraReducers(builder){
    builder.addCase(ShowsnackBar, (state,action)=>{
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
      
    }).addCase(ClosesnackBar,(state,action)=>{
      state.snackbar.open = false;
      state.snackbar.message = null;
    })

    builder.addCase(ToggleSideBar,(state,action)=>{
      state.sidebar.sidebarBehaviour = !state.sidebar.sidebarBehaviour;
      state.sidebar.type = action.payload.type;
    })
    builder.addCase(CheckOutType,(state,action)=>{
      state.checkOut.behaviour = ! state.checkOut.behaviour;
      state.checkOut.type = action.payload.type;
    })
    
    builder.addCase(ToggleBlury,(state,action)=>{
      state.common.blury = !state.common.blury;
    })
    builder.addCase(ToggleMode,(state,action)=>{
      state.common.dark = !state.common.dark;
    })
  },
  
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
//  Actions:

// export const getShopInfo = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "LoadShopRequest",
//     });


//      await axios.get(`${API_LEVEL}/shop/getshop-info/${id}`, {
//     }).then(function(response){
//       dispatch(
//         slice.actions.LoadShopSuccess({
//           payload: response.data.shopData
//         })
//      );
  
//       // dispatch( ShowsnackBar({ severity: "success", message: response.data.message}))

//     }).catch(function (error) {
//       dispatch({
//         type: "LoadShopFail",
//         payload: error,
//       });
//       // dispatch( ShowsnackBar({ severity: "error", message: error.message }))
     
//     });
   
 
//   } catch (error) {
//     dispatch({
//       type: "LoadShopFail",
//       payload: error,
//     });
//     // dispatch( ShowsnackBar({ severity: "error", message: error.message }))

//     console.log(error)
//   }
// }

