import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../untils/api";
const init = {
    data:null,
    loading:false,
}
export const getLoggedProfile = createAsyncThunk("profile/getLogged", async ()=>{
    try {
        const res = await api.get("/api/profile/me");
        return res.data
    } catch (error) {
        console.log(error);
    }
});
export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (payload) => {
      try {
        const response = await api.post("/api/profile", payload.formData);
        payload.navigate("/dashboard");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
export const updateEdu = createAsyncThunk(
    "profile/updateEdu",
    async (payload) => {
      try {
        const response = await api.put("/api/profile/education", payload.formData);
        payload.navigate("/dashboard");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
export const UpdateExp = createAsyncThunk(
  "profile/updateExp",
  async (payload)=>{
    try {
      const response = await api.put("/api/profile/experience", payload.formData);
      payload.navigate("/dashboard");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const DeleteExp = createAsyncThunk(
  "profile/DeleteExp",
  async (payload)=>{
    try {
      const response = await api.delete(`/api/profile/experience/${payload}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const DeleteEdu = createAsyncThunk(
  "profile/DeleteEdu",
  async (payload)=>{
    try {
      const response = await api.delete(`/api/profile/education/${payload}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const profileSlice = createSlice({
    name: "profile",
    initialState: init,
    reducers: {},
    extraReducers(builder) {
      builder
      // Get
        .addCase(getLoggedProfile.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getLoggedProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getLoggedProfile.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
        // Update
        .addCase(updateProfile.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
        // Update edu
        .addCase(updateEdu.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(updateEdu.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(updateEdu.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
      //  update exp
        .addCase(UpdateExp.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(UpdateExp.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(UpdateExp.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
        // delete edu
        .addCase(DeleteEdu.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(DeleteEdu.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(DeleteEdu.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
        // delete exp
        .addCase(DeleteExp.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(DeleteExp.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(DeleteExp.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
        })
    },
  });
export default profileSlice.reducer;