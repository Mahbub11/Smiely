import { configureStore } from "@reduxjs/toolkit";
import { useDispatch,useSelector } from "react-redux";
import {persistStore,persistReducer}  from 'redux-persist'
import { rootPersistConfig, rootReducer } from './rootReducer';

const store=configureStore({
    reducer:persistReducer(rootPersistConfig, rootReducer),
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
        immutableCheck:false
    })
})

const persistor=persistStore(store);
const {dispatch} =store;
 const useAppSelector= useSelector;


 const useAppDispatch=()=> useDispatch();

export{ store,persistor,dispatch,useAppSelector,useAppDispatch}