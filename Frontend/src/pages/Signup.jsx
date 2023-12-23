import React, { useState } from "react";
import styled from "styled-components";
import * as Components from "../components/Components";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function App() {
  const [teacherData, setTeacherData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [studentData, setStudentData] = useState({
    email: "",
    parentEmail: "",
    phone: "",
    password: "",
  });

  const handleTeacherSignup = () => {
    // Perform actions with teacherData, e.g., send it to a server
    console.log("Teacher Signup:", teacherData);
  };

  const handleStudentSignup = (e) => {
    e.preventDefault();
    // Perform actions with studentData, e.g., send it to a server
    console.log("Student Signup:", studentData);
  };

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [signIn, toggle] = React.useState(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-start">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <center>
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Teacher</Components.Title>
              <Components.Input
                required
                type="email"
                name="email"
                placeholder="email"
                onChange={handleTeacherChange}
              />
              <Components.Input
                required
                type="text"
                name="name"  // Change here
                placeholder="Name"
                onChange={handleTeacherChange}
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleTeacherChange}
              />
              <br />
              <Components.Button
                style={{ cursor: "pointer" }}
                onClick={handleTeacherSignup}  // Change here
              >
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Student</Components.Title>
              <Components.Input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleStudentChange}
              />
              <Components.Input
                type="email"
                name="parentEmail"  // Change here
                placeholder="Parent's Email"
                onChange={handleStudentChange}
              />
              <Components.Input
                type="tel"
                name="phone"  // Change here
                pattern="[0-9]{10}"
                placeholder="Phone"
                onChange={handleStudentChange}
                maxLength="10"
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleStudentChange}
              />
              <br />
              <a href="/">
                <Components.Button
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleStudentSignup(e);  // Change here
                  }}
                >
                  Sign Up
                </Components.Button>
              </a>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>For Students</Components.Title>
                <Components.Paragraph>
                  Students Sign Up here
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={() => toggle(true)}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>For Teachers</Components.Title>
                <Components.Paragraph>
                  Teachers Sign up here
                </Components.Paragraph>
                <Components.GhostButton
                  onClick={() => toggle(false)}
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
        
      </center>
    </>
  );
}

export default App;
