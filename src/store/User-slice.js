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
      if (actions?.payload["userName"]) {
        state.userSession = actions.payload["userName"];
        state.isAdmin = actions.payload["admin"];

        sessionStorage.setItem("userSession", actions.payload["userName"]);
        sessionStorage.setItem("isAdmin", actions.payload["admin"]);
      }
    },
    logout(state, actions) {
      state.userSession = "";
      state.isAdmin = "";
      sessionStorage.clear();
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
