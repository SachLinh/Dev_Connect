import { createSlice, nanoid } from "@reduxjs/toolkit";

// [{id: dsfdsf, msg: 'Lỗi đăng nhập', alertType: 'danger'}]
const init = [];

export const alertSlice = createSlice({
  name: "alert",
  initialState: init,
  reducers: {
    setAlert: (state, action) => {
      const id = nanoid();
      const msg = action.payload.msg;
      const alertType = action.payload.alertType;
      state.push({ id, msg, alertType });
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
