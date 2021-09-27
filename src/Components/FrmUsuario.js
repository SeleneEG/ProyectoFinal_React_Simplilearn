import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { IndexActions } from "../store/Index-slice";
import { useHistory } from "react-router-dom";
import { create, getAll } from "../thunks/event-action";
import { getCities } from "../thunks/location-actions";

function FrmUsuario() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const location = useSelector((state) => state.Index.userRegion);
  const LocationStates = useSelector((state) => state.Location.LocationStates);
  const StateCities = useSelector((state) => state.Location.StateCities);
  const UserRegion = useSelector((state) => state.Index.userRegion);

  const [enteredTitle, titleChangeHandler] = useState("");
  const [enteredAddress, addressChangeHandler] = useState("");
  const [enteredState, stateChangeHandler] = useState("");
  const [enteredCity, cityChangeHandler] = useState("");
  const [enteredDate, dateChangeHandler] = useState("");
  const [enteredTimeStart, timeStartChangeHandler] = useState("");
  const [enteredTimeEnd, timeEndChangeHandler] = useState("");
  const [enteredDescription, descriptionChangeHandler] = useState("");

  useEffect(() => {}, [dispatch]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let payload = {
      title: enteredTitle,
      address: enteredAddress,
      country: UserRegion,
      state: enteredState,
      city: enteredCity,
      date: enteredDate,
      timeStart: enteredTimeStart,
      timeEnd: enteredTimeEnd,
      description: enteredDescription,
    };
    console.log(`>>>>>>>>> ${JSON.stringify(payload)}`);

    // dispatch(getCities("Veracruz"));
    // dispatch(create(payload));
    // dispatch(getAll());
    // dispatch(IndexActions.setstrtMsg("Event added successfully!"));
    // dispatch(IndexActions.toggleStrMsg(true));
    // history.push("/");
  };

  const regresar = () => {
    history.push("/");
  };

  const selectStates = () => {
    let content = LocationStates.map((element) => (
      <option value={element.name} key={element.state_code}>
        {element.name}
      </option>
    ));
    return content;
  };

  const selectCities = () => {
    let content = StateCities.map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));
    return content;
  };

  return (
    <Fragment>
      <title>CRUD ASP Clásico</title>
      <NavBar />
      <div className="container">
        <div className="starter">
          <div className="row ">
            <div className="col-sm-6 card card-margin">
              <h1>Register Event</h1>
              <div className="card-body pt-0">
                <form
                  role="form"
                  id="db-form"
                  name="db-form"
                  onSubmit={formSubmitHandler}
                >
                  <div className="form-group-attached">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Title: </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            onChange={(event) =>
                              titleChangeHandler(event.target.value)
                            }
                            value={enteredTitle || ""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Address: </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="form-control"
                            onChange={(event) =>
                              addressChangeHandler(event.target.value)
                            }
                            value={enteredAddress || ""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>State: </label>
                          <select
                            name="state"
                            id="state"
                            className="form-control"
                            onChange={(event) =>
                              stateChangeHandler(event.target.value)
                            }
                            value={enteredState || ""}
                            required
                          >
                            <option value="">Select one state</option>
                            {selectStates()}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>City: </label>
                          <select
                            name="city"
                            id="city"
                            className="form-control"
                            onChange={(event) =>
                              cityChangeHandler(event.target.value)
                            }
                            value={enteredCity || ""}
                            required
                          >
                            <option value="">Select one city</option>
                            {selectCities()}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Date: </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            className="form-control"
                            onChange={(event) =>
                              dateChangeHandler(event.target.value)
                            }
                            value={enteredDate || ""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Start time: </label>
                          <input
                            type="time"
                            name="timeStart"
                            id="timeStart"
                            className="form-control"
                            onChange={(event) =>
                              timeStartChangeHandler(event.target.value)
                            }
                            value={enteredTimeStart || ""}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>End time: </label>
                          <input
                            type="time"
                            name="timeEnd"
                            id="timeEnd"
                            className="form-control"
                            onChange={(event) =>
                              timeEndChangeHandler(event.target.value)
                            }
                            value={enteredTimeEnd || ""}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Description: </label>
                          <textarea
                            type="text"
                            name="description"
                            id="description"
                            className="form-control"
                            onChange={(event) =>
                              descriptionChangeHandler(event.target.value)
                            }
                            value={enteredDescription || ""}
                            required
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <div className="btn pull-right">
                        <button className="btn btn-info" onClick={regresar}>
                          Regresar
                        </button>
                        &nbsp;
                        <button type="submit" className="btn btn-primary">
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FrmUsuario;
