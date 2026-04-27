import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    loading: true,
  },
  reducers: {
    login:(state,action)=>{
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout:(state)=>{
        state.token='';
        state.user=null;
        localStorage.removeItem('');
    },
    setpayload:(state,action)=>{
        state.loading = action.payload;
    }
    },
})
export const {login,logout,setpayload} = authSlice.actions;
export default authSlice.reducer;