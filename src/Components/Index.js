import { Fragment, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { IndexActions } from "../store/Index-slice";
import { useHistory } from "react-router-dom";
import { get, deleteEvent, getAll } from "../thunks/event-action";
import NavBar from "./NavBar";
import sadFace from "../assets/img/sad_face.gif";

function Index() {
  const history = useHistory();
  let i;
  const dispatch = useDispatch();
  const UserRegion = useSelector((state) => state.Index.userRegion);
  const strMsg = useSelector((state) => state.Index.strMsg);
  const showStrMsg = useSelector((state) => state.Index.showStrMsg);
  const ObjRst = useSelector((state) => state.Index.ObjRst);
  const userSession = useSelector((state) => state.User.userSession);
  const isAdmin = useSelector((state) => state.User.isAdmin);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch, ObjRst]);

  useEffect(() => {
    window.setTimeout(() => {
      handleClose();
    }, 2000);
  }, [strMsg]);

  function deleteButton(element) {
    if (isAdmin || userSession === element.user) {
      return (
        <button
          onClick={() => {
            handleShowModal(element.id);
          }}
          className="btn btn-sm btn-flash-border-primary"
        >
          Delete
        </button>
      );
    }
  }

  function getEvents() {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let content;

    if (ObjRst.filter((element) => element.country === UserRegion).length > 0) {
      content = ObjRst.filter((element) => element.country === UserRegion)
        .filter(
          (element) => new Date(element.date).getTime() >= new Date().getTime()
        )
        .map((element) => (
          <div className="col-lg-4" key={element.id}>
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title">
                  {days[new Date(element.date).getUTCDay()]}
                </h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-success">
                      <span className="widget-49-date-day">
                        {new Date(element.date).getUTCDate()}
                      </span>
                      <span className="widget-49-date-month">
                        {months[new Date(element.date).getMonth()]}
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">
                        {element.title}
                      </span>
                      <span className="widget-49-meeting-time">
                        Posted by {element.user}
                      </span>
                    </div>
                  </div>
                  <br />
                  <ul className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item">
                      <span>
                        {element.timeStart} to {element.timeEnd} Hrs
                      </span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>{element?.address}</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>
                        {element.city}, {element.state}
                      </span>
                    </li>
                  </ul>
                  <div className="widget-49-meeting-action">
                    <button
                      onClick={() => {
                        getEvent(element.id);
                      }}
                      className="btn btn-sm btn-flash-border-primary"
                    >
                      View Details
                    </button>
                    {deleteButton(element)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
    } else {
      content = (
        <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Image src={sadFace} rounded />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <h3>No events were found in {UserRegion}</h3>
            </div>
          </div>
        </div>
      );
    }

    return content;
  }

  function getEvent(var1) {
    dispatch(get(var1));
    history.push("/details");
  }

  function deleteUsuario() {
    dispatch(deleteEvent(selectedId));
    dispatch(getAll());
    setShow(false);
    dispatch(IndexActions.toggleStrMsg(true));
    dispatch(IndexActions.setstrtMsg("Registro borrado exitosamente"));

    window.setTimeout(() => {
      handleClose();
    }, 2000);
  }

  function addEvent() {
    history.push("/register");
  }

  const handleClose = () => {
    dispatch(IndexActions.toggleStrMsg(false));
  };

  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  return (
    <Fragment>
      <title>FindMyEvents</title>
      <NavBar />
      <div className="container">
        {showStrMsg ? (
          <div className="alert alert-success">
            {strMsg}{" "}
            <button className="close" onClick={handleClose}>
              x
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className="starter-template">
          <h1>Events in {UserRegion}</h1>
          <div className="row">
            <div className="col-md-8">
              <p align="left">
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => {
                    addEvent();
                  }}
                >
                  <i className="glyphicon glyphicon-plus"></i>
                  <span>&nbsp;&nbsp;Add Event</span>
                </Button>
              </p>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row">{getEvents()}</div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete the event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteUsuario}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Index;
