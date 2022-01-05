import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../untils/api';

const init = {
    token: localStorage.getItem('token'),
    loading: false,
    user: null
};

export const registerUser = createAsyncThunk("auth/register",
async (payload) =>{
    try {
        const response = await api.post("api/users", payload);
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);
export const loginUser = createAsyncThunk("auth/login", async (payload)=>{
    try {
        const response = await api.post("/api/auth", payload);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})
export const authSlice = createSlice({
    name:"auth",
    initialState:init,
    reducers: {
        logout:(state)=>{
            localStorage.removeItem("token");
            return {...state, token:null, loading:false, user:null}
        }
    },
    extraReducers(builder){
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.token = action.payload.token;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false;
        })
        .addCase(loginUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
        })

    }
})
export const {logout} = authSlice.actions;
export default authSlice.reducer;