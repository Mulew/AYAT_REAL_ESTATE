import { createSlice } from '@reduxjs/toolkit'

const initialState  ={
    currentuser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name: 'user',
    initialState ,
    reducers:{
        signinstart:(state)=>{
            state.loading = true;
        },
        signinsuccess:(state,action)=>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinfailer: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateuserstart:(state)=>{
            state.loading = true;
        },
        updateusersuccess:(state,action)=>{
            state.currentuser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updatefailerror:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {signinstart,signinsuccess,signinfailer,updateuserstart,updateusersuccess,updatefailerror} = userSlice.actions;
export default userSlice.reducer;