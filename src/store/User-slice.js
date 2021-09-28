import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  userSession: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState: initialUserState,
  reducers: {
    setUserSession(state, actions) {
      state.userSession = actions.payload;
      console.log(`>>>>>>>>>>> Usuario en sesión ${actions.payload}`);
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
