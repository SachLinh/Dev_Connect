import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../untils/api";
const init = {
    profile:null,
    listProfile: null,
    loading:false,
}
export const getAllProfile = createAsyncThunk("profiles/getAll", async ()=>{
    try {
        const res = await api.get("/api/profile");
        return res.data
    } catch (error) {
        console.log(error);
    }
});

export const getAllProfileByID = createAsyncThunk("profiles/getProfileID", async (payload)=>{
    try {
        const res = await api.get(`/api/profile/user/${payload}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
});
export const AllProfileSlice = createSlice(
    {
        name:"Fullprofile",
        initialState : init,
        reducers:{

        },
        extraReducers(builder){
            builder
            // get all profile
            .addCase(getAllProfile.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(getAllProfile.fulfilled,(state,action)=>{
                state.loading = false;
                state.listProfile = action.payload;
            })
            .addCase(getAllProfile.rejected,(state,action)=>{
                state.loading = false;
                state.listProfile = null
            })
            // get profile by ID
            .addCase(getAllProfileByID.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(getAllProfileByID.fulfilled,(state,action)=>{
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getAllProfileByID.rejected,(state,action)=>{
                state.loading = false;
                state.profile = null
            })
        }
    }
)
export default AllProfileSlice.reducer;
