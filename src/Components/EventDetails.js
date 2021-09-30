import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { IndexActions } from "../store/Index-slice";
import { useHistory } from "react-router-dom";

function EventDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const SelectedEvent = useSelector((state) => state.Index.objEvent);
  const [objSelectedEvent, setEventSelected] = useState(null);

  useEffect(() => {
    setEventSelected(SelectedEvent);
  }, [SelectedEvent, dispatch]);

  const goBack = () => {
    history.push("/index");
  };

  const formatDate = (date) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    if (date) {
      let eventDate = new Date(date);

      let today = new Date(
        eventDate.getUTCFullYear() +
          "-" +
          (eventDate.getUTCMonth() + 1) +
          "-" +
          eventDate.getUTCDate()
      );
      let formatDate = today.toLocaleDateString("en-US", options);

      return formatDate;
    }
  };

  return (
    <Fragment>
      <NavBar />
      <div className="container">
        <div className="starter">
          <div className="row ">
            <div className="col-md-6">
              <div className="card card-margin">
                <div className="card-header no-border">
                  <strong>
                    <h1>{objSelectedEvent?.title}</h1>
                  </strong>
                </div>
                <div className="card-header no-border">
                  Posted by: &nbsp; <strong>{objSelectedEvent?.user}</strong>
                </div>
                <div className="card-body pt-0">
                  <div className="widget-49">
                    <br />
                    <div className="row">
                      <div className="col-md-3">
                        <strong>When:</strong>
                      </div>
                      <div className="col-md-9">
                        {" "}
                        {formatDate(SelectedEvent?.date)},{" "}
                        {SelectedEvent?.timeStart} -{SelectedEvent?.timeEnd} hrs
                      </div>
                    </div>

                    <div className="row pt-4">
                      <div className="col-md-3">
                        <strong>Where: </strong>
                      </div>
                      <div className="col-md-9"> {SelectedEvent?.address}</div>
                    </div>

                    <div className="row ">
                      <div className="col-md-3"></div>
                      <div className="col-md-9">
                        {" "}
                        {SelectedEvent?.city}, {SelectedEvent?.state},{" "}
                        {SelectedEvent?.country}
                      </div>
                    </div>

                    <div className="row  pt-4">
                      <div className="col-md-3">
                        <strong>Description: </strong>
                      </div>
                      <div className="col-md-9">
                        <p className="description">
                          {SelectedEvent?.description}
                        </p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <div className="btn pull-right">
                          <button className="btn btn-info" onClick={goBack}>
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EventDetails;
