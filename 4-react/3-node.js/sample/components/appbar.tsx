import Link from "next/link";

import { Navbar, Container, Nav } from "react-bootstrap";

const AppBar = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Container className="w-100">
        <Navbar.Brand className="ms-3">
          <Link href="/">
            <span className="text-light">Dangol</span>
          </Link>
        </Navbar.Brand>
        <div className="d-flex justify-content-end me-3">
          <a className="text-light" href="/about">
            HOME
          </a>
          <Nav className="me-auto">
            <Nav.Link>
              <Link href="/about">
                <a href="/about" className="text-light">
                  PARTNER
                </a>
              </Link>
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppBar;
