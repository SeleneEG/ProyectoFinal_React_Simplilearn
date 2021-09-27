import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
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
      </Navbar>
      {/* <link href="css/bootstrap.min.css" rel="stylesheet" /> */}
      {/* <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
    <div className="navbar-header">
    <button
    type="button"
    className="navbar-toggle collapsed"
    data-toggle="collapse"
    data-target="#navbar"
    aria-expanded="false"
    aria-controls="navbar"
    >
    <span className="sr-only">Toggle navigation</span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    </button>
    <a className="navbar-brand" href="index.asp">
    CRUD ASP
    </a>
    </div>
    </div>
</nav> */}
    </Fragment>
  );
}

export default NavBar;
