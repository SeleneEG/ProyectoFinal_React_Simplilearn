import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

function NavBar() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => state.User.userSession);

  useEffect(() => {}, [dispatch, userSession]);

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
            Signed in as: <b>{userSession}</b>
          </Navbar.Text>
          <Button variant="outline-info">Log out</Button>
        </Form>
      </Navbar>
    </Fragment>
  );
}

export default NavBar;
