/* eslint-disable */
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import Data from './data.js';

import { Route, Switch } from 'react-router-dom';



function App() {
  const [shoes, setShoes] = useState(Data);

  return (
    <>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">shoe shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="background">
        <h1>20% Season Off</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to feature content or information.</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>





      <div className="container">
        <div className="row">
          {
            shoes.map((a, i) => {
              return <Card shoes={shoes[i]} i={i} key={i}
              // return <Card shoes={a}
              />
            })
          }
        </div>
      </div>
    </>
  )
}

function Card(props: any) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  )
}

export default App;
