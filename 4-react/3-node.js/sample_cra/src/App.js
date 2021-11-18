/* eslint-disable */
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';
import Cart from './Cart.js'

import { Link, Route, Switch, useHistory } from 'react-router-dom';



function App() {
  const [shoes, setShoes] = useState(Data);
  const [재고, 재고변경] = useState([10, 11, 12]);


  return (
    <>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">shoe shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/Detail"> Detail</Nav.Link>
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


      <Switch>
        <Route exact path="/">
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
            <button className="btn btn-primary" onClick={() => {



              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {

                  console.log(result.data);
                  setShoes([...shoes, ...result.data]);

                })
                .catch(() => {
                  console.log('실패했어요')
                })

            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>



        <Route path="/cart">
          <Cart></Cart>
        </Route>







        <Route path="/:id">
          <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>
      </Switch>

    </>
  )
}





function Card(props) {

  const history = useHistory();

  return (
    <div className="col-md-4" onClick={() => { history.push('/detail/' + props.shoes.id) }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  )
}

export default App;
