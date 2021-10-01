import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { IndexActions } from "../store/Index-slice";
import { useHistory } from "react-router-dom";
import { create, getAll } from "../thunks/event-action";
import { getCitiesState } from "../thunks/location-actions";

function FrmEvent() {
  const history = useHistory();
  const dispatch = useDispatch();
  const LocationStates = useSelector((state) => state.Location.LocationStates);
  const StateCities = useSelector((state) => state.Location.StateCities);
  const UserRegion = useSelector((state) => state.Index.userRegion);

  const [loadedCities, loadedCitiesChangeHandler] = useState([]);
  const [enteredTitle, titleChangeHandler] = useState("");
  const [enteredAddress, addressChangeHandler] = useState("");
  const [enteredState, stateChangeHandler] = useState("");
  const [enteredCity, cityChangeHandler] = useState("");
  const [enteredDate, dateChangeHandler] = useState("");
  const [enteredTimeStart, timeStartChangeHandler] = useState("");
  const [enteredTimeEnd, timeEndChangeHandler] = useState("");
  const [enteredDescription, descriptionChangeHandler] = useState("");

  useEffect(() => {
    loadedCitiesChangeHandler(StateCities);
  }, [dispatch, StateCities]);

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
      user: sessionStorage.userSession,
    };

    dispatch(create(payload));
    dispatch(getAll());
    dispatch(IndexActions.setstrtMsg("Event added successfully!"));
    dispatch(IndexActions.toggleStrMsg(true));
    history.push("/index");
  };

  const goBack = () => {
    history.push("/index");
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
    let content = loadedCities.map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));
    return content;
  };

  const selectStateHandler = (event) => {
    stateChangeHandler(event.target.value);
    console.log(`Selected State ${event.target.value}`);
    dispatch(getCitiesState(UserRegion, event.target.value));
    loadedCitiesChangeHandler(StateCities);
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
                <form id="db-form" name="db-form" onSubmit={formSubmitHandler}>
                  <div className="form-group-attached">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            Title<span className="required">*</span>:
                          </label>
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
                          <label>
                            Address<span className="required">*</span>:
                          </label>
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
                          <label>
                            State<span className="required">*</span>:
                          </label>
                          <select
                            name="state"
                            id="state"
                            className="form-control"
                            onChange={selectStateHandler}
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
                          <label>
                            City<span className="required">*</span>:
                          </label>
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
                          <label>
                            Date<span className="required">*</span>:
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            className="form-control"
                            onChange={(event) =>
                              dateChangeHandler(event.target.value)
                            }
                            value={enteredDate || ""}
                            min={new Date().toLocaleDateString("en-ca")}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            Start time<span className="required">*</span>:
                          </label>
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
                          <label>
                            End time<span className="required">*</span>:
                          </label>
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
                          <label>
                            Description<span className="required">*</span>:
                          </label>
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
                        <button className="btn btn-info" onClick={goBack}>
                          Back
                        </button>
                        &nbsp;
                        <button type="submit" className="btn btn-primary">
                          Save
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

export default FrmEvent;
