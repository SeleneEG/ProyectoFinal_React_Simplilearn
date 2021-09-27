import { configureStore } from "@reduxjs/toolkit";
import IndexReducer from "./Index-slice.js";
import LocationReducer from "./Location-slice.js";

const store = configureStore({
  reducer: {
    Index: IndexReducer,
    Location: LocationReducer,
  },
});

export default store;
