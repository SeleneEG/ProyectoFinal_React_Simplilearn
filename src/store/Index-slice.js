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
        title: objTemp.title,
        address: objTemp.address,
        country: objTemp.country,
        state: objTemp.state,
        city: objTemp.city,
        date: objTemp.date,
        timeStart: objTemp.timeStart,
        timeEnd: objTemp.timeEnd,
        description: objTemp.description,
        user: objTemp.user,
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
