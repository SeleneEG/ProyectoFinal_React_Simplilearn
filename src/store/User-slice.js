import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userSession: "",
  isAdmin: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    setUserSession(state, actions) {
      state.userSession = actions.payload["userName"];
      state.isAdmin = actions.payload["admin"];
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
