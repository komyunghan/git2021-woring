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
          <Nav className="me-auto">
            <div>
              <Link href="/StoreList">
                <a href="/BookMark" className="text-light">
                  즐겨찾기
                </a>
              </Link>
            </div>
            <div>
              <Link href="/partner">
                <a href="/partner" className="text-light">
                  파트너
                </a>
              </Link>
            </div>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default AppBar;
