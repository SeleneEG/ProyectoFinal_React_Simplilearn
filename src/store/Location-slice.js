import { createSlice } from "@reduxjs/toolkit";

const initialLocationState = {
  LocationStates: [],
  StateCities: [],
  defaultState: "",
  defaultCity: "",
};

const LocationSlice = createSlice({
  name: "Location",
  initialState: initialLocationState,
  reducers: {
    setLocationStates(state, actions) {
      state.LocationStates = actions.payload;
    },
    setStateCities(state, actions) {
      state.StateCities = actions.payload;
    },
    setDefaultState(state, actions) {
      state.defaultState = actions.payload;
      state.defaultState = actions.payload[0];
    },
    setDefaultCity(state, actions) {
      state.defaultCity = actions.payload;
      state.defaultCity = actions.payload[0];
    },
  },
});

export const LocationActions = LocationSlice.actions;
export default LocationSlice.reducer;
