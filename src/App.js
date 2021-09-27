import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import FrmUsuario from "./Components/FrmUsuario";
import Index from "./Components/Index";
import { useState, useEffect } from "react";
import { getUserLocation } from "./thunks/location-actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLocation());
  }, []);

  return (
    <main>
      <Route path="/" exact>
        <Redirect to="/index" />
      </Route>
      <Route path="/formulario" exact>
        <FrmUsuario />
      </Route>
      <Route path="/index" exact>
        <Index />
      </Route>
    </main>
  );
}

export default App;
