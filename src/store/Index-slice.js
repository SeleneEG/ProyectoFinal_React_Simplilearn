import { createSlice } from "@reduxjs/toolkit";

const initialIndexState = {
  ObjRst: [],
  objEvent: null,
  strMsg: "",
  showStrMsg: false,
  userRegion: "",
};

const IndexSlice = createSlice({
  name: "Index",
  initialState: initialIndexState,
  reducers: {
    getEvent(state, actions) {
      let objTemp = actions.payload;
      state.objEvent = {
        id: objTemp.id,
        name: objTemp.name,
        email: objTemp.email,
      };
    },
    getAllEvents(state, actions) {
      state.ObjRst = actions.payload;
    },

    setstrtMsg(state, actions) {
      state.strMsg = actions.payload;
    },

    toggleStrMsg(state, actions) {
      state.showStrMsg = actions.payload;
    },
    setUserRegion(state, actions) {
      state.userRegion = actions.payload;
    },
  },
});

export const IndexActions = IndexSlice.actions;
export default IndexSlice.reducer;
