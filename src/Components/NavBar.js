import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserActions } from "../store/User-slice";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, [dispatch]);

  function logout() {
    dispatch(UserActions.logout());
    history.push("/");
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Navbar.Brand href="index">Find my event</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
          <Navbar.Text>
            Signed in as: <b>{sessionStorage.userSession}</b>
          </Navbar.Text>
          <Button variant="outline-info" onClick={logout}>
            Logout
          </Button>
        </Form>
      </Navbar>
    </Fragment>
  );
}

export default NavBar;
