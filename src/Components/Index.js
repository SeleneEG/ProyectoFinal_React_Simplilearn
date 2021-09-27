import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { IndexActions } from "../store/Index-slice";
import { useHistory } from "react-router-dom";
import { get, deleteEvent, getAll } from "../thunks/event-action";
import NavBar from "./NavBar";

function Index() {
  const history = useHistory();
  let i;
  const dispatch = useDispatch();
  const strMsg = useSelector((state) => state.Index.strMsg);
  const showStrMsg = useSelector((state) => state.Index.showStrMsg);
  const ObjRst = useSelector((state) => state.Index.ObjRst);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    window.setTimeout(() => {
      handleClose();
    }, 2000);
  }, [strMsg]);

  function getEvents() {
    let content = ObjRst.map((element) => (
      <div className="col-lg-4" key={element.id}>
        <div className="card card-margin">
          <div className="card-header no-border">
            <h5 className="card-title">MOM</h5>
          </div>
          <div className="card-body pt-0">
            <div className="widget-49">
              <div className="widget-49-title-wrapper">
                <div className="widget-49-date-success">
                  <span className="widget-49-date-day">09</span>
                  <span className="widget-49-date-month">apr</span>
                </div>
                <div className="widget-49-meeting-info">
                  <span className="widget-49-pro-title">{element.title}</span>
                  <span className="widget-49-meeting-time">
                    {element.timeStart} to {element.timeEnd} Hrs
                  </span>
                </div>
              </div>
              <ol className="widget-49-meeting-points">
                <li className="widget-49-meeting-item">
                  <span>Expand module is removed</span>
                </li>
                <li className="widget-49-meeting-item">
                  <span>Data migration is in scope</span>
                </li>
                <li className="widget-49-meeting-item">
                  <span>Session timeout increase to 30 minutes</span>
                </li>
              </ol>
              <div className="widget-49-meeting-action">
                <button
                  onClick={() => {
                    getEvent(element.id);
                  }}
                  className="btn btn-sm btn-flash-border-primary"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    handleShowModal(element.id);
                  }}
                  className="btn btn-sm btn-flash-border-primary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    return content;
  }

  function getEvent(var1) {
    dispatch(get(var1));
    history.push("/formulario");
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
    history.push("/formulario");
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
      <title>CRUD ASP Clásico</title>
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
          <h1>Events</h1>
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
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de eliminar el registro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={deleteUsuario}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Index;
