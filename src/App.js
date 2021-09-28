import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import FrmEvent from "./Components/FrmEvent";
import Index from "./Components/Index";
import { useState, useEffect } from "react";
import { getUserLocation } from "./thunks/location-actions";
import { useDispatch } from "react-redux";
import EventDetails from "./Components/EventDetails";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  return (
    <main>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/register" exact>
        <FrmEvent />
      </Route>
      <Route path="/details" exact>
        <EventDetails />
      </Route>
      <Route path="/index" exact>
        <Index />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </main>
  );
}

export default App;
