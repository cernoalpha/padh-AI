import React, { useState } from "react";
import "../styles/TeachDash.css";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  ListGroup,
  Card,
  FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TeacherDashboard = () => {

  const handleCloseSchedule = () => {
    setShowCalendar(false);
  };


  const backendData = [
    {
      courseName: "React Programming",
      students: [
        { id: 1, name: "Student 1" },
      ],
    },
    {
      courseName: "JavaScript Fundamentals",
      students: [
        { id: 4, name: "Student 4" },
      ],
    },
  ];

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newClass, setNewClass] = useState({
    date: "",
    time: "",
    subject: "",
    description: "",
    meetLink: "",
  });
  const [createdClasses, setCreatedClasses] = useState([]);

  const handleCreateClass = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const handleSaveClass = () => {

    // if (
    //   !selectedDate ||
    //   !newClass.time ||
    //   !newClass.subject ||
    //   !newClass.description ||
    //   !newClass.meetLink
    // ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const createdClass = {
      date: selectedDate.toDateString(),
      time: newClass.time,
      subject: newClass.subject,
      description: newClass.description,
      meetLink: newClass.meetLink,
    };

    // Save the new class data
    setCreatedClasses([...createdClasses, createdClass]);

    // Log the information of the saved class to the console
    console.log("Class Information:", createdClass);

    // Close the calendar after saving
    setShowCalendar(false);

    // Reset the form fields
    setNewClass({
      date: "",
      time: "",
      subject: "",
      description: "",
      meetLink: "",
    });
  };

  const handleClassClick = (index) => {
    // Log the information of a particular class to the console
    console.log("Class Information:", createdClasses[index]);
  };

  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  const handlecancelClick = ()=>{
    setCreatedClasses([])

  }

  return (
    <>
      <div className="main-wrapper">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <Nav.Link as={Link} to="/teacherdash">Home</Nav.Link>
              <Nav.Link as={Link} to="/createcourse">My Courses</Nav.Link>
              <Nav.Link as={Link} to="/createass">Assignments</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <br />
        <Container className="mt-3">
          <Container className="mt-3">
            {backendData.map((course, index) => (
              <div key={index} className="course-box">
                <h3>{course.courseName}</h3>
                <ul className="list-group course">
                  {course.students.map((student) => (
                    <li
                      key={student.id}
                      className="list-group-item my-1 list-item"
                    >
                      {student.id}
                      {student.name}
                      <div className="button-container">
                        <Button className="btn mx-2 btn-primary" onClick={handleCreateClass}>Schedule Class</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Container>

          <div className="schedule">
            {showCalendar && (
              <Card className="mb-3">
                <Card.Header>

                  <div className="d-flex justify-content-between">
                    <h3>Schedule</h3>
                    <button className="btn btn-primary" onClick={handleCloseSchedule}>close</button>
                  </div>
                </Card.Header>
                <Card.Body>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <br />
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      className="form-control mb-3"
                    />
                  </Form.Group>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Time:</Form.Label>
                      <FormControl
                        type="time"
                        style={{ width: "200px" }}
                        name="time"
                        value={newClass.time}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject:</Form.Label>
                      <FormControl
                        type="text"
                        name="subject"
                        value={newClass.subject}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description:</Form.Label>
                      <FormControl
                        as="textarea"
                        name="description"
                        value={newClass.description}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button
                      type="button"
                      onClick={handleSaveClass}
                      variant="success"
                    >
                      Save Class
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="created-classes">
            <Row>
              {createdClasses.map((cls, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card
                    onClick={() => handleClassClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Body>
                      <Card.Title>{cls.subject}</Card.Title>
                      <Card.Text>{cls.description}</Card.Text>
                      <Card.Text>
                        {cls.date} - {cls.time}
                      </Card.Text>
                      <button className="btn btn-danger mx-2" onClick={handlecancelClick}>cancel</button>
                      <a
                        href={cls.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Join Class
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>

      </div>
    </>
  );
};

export default TeacherDashboard;

