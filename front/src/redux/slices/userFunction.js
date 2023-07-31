import { createSlice, current } from '@reduxjs/toolkit';
export const userData =(data,id,newUserData)=>{
    const newData = data.following.map(item=>item === id ? newUserData :item)
    console.log(newData)
    return newData
}