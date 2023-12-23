import React from 'react'
import '../styles/Main.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';




export default function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="ml-auto"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-start">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="hero-container">
        <div className="hero-content">
          {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8ivjh3jEgWs6uv7DMzADcxPcFaWP00H1hQ&usqp=CAU' alt="TutorHub Logo" className="app-logo" /> */}
          <div className="title">

            <h2>Welcome to</h2> <h1>Padh-AI</h1>
          </div>

          <p>Empowering Teachers. Inspiring Students.</p>
          <div className="cta-buttons">
            <Link to="/signin">
              <button className="cta-button" onClick={() => navigate('/signin')}>
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="cta-button" onClick={() => navigate('/signup')}>
                Sign UP
              </button>
            </Link>
         
          </div>
        </div>
      </div>
    </>
  )
}
