import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Courses.css"
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseListing = ({ course, onMouseEnter, onMouseLeave, isActive, handleEnroll, enrolledCourses }) => (
  <Card
      className={`mb-4 ${isActive ? 'border-primary' : ''}`}
      style={{
        margin: '10px',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: isActive ? '0 0 10px rgba(33, 150, 243, 0.5)' : '0 0 5px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card.Title className="mb-3">
        <span className={`text-primary ${isActive ? 'fw-bold' : ''}`}>{course.name}</span>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{course.gradeLevel}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{course.teacherName}</Card.Subtitle>
      <Card.Text
        style={{
          marginTop: '8px',
          fontStyle: isActive ? 'inherit' : 'italic',
        }}
      >
        {course.description}
      </Card.Text>
      {enrolledCourses.includes(course.id) ? (
        <Button variant="outline-secondary" disabled>
          Enrolled
        </Button>
      ) : (
        <Button
          variant={`outline-${isActive ? 'primary' : 'info'}`}
          style={{ marginTop: '10px' }}
          onClick={() => handleEnroll(course)}
        >
          Enroll
        </Button>
      )}
    </Card>

);

const CoursesPage = () => {

  const tempEnrolledCourses = [1, 3];

  // State variables
  const [courses, setCourses] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGradeLevel, setFilterGradeLevel] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState(tempEnrolledCourses);

  const groupedCourses = Object.keys(courses).reduce((acc, subject) => {
    acc[subject] = courses[subject].map((course) => course);
    return acc;
  }, {});

  const filteredCourses = Object.keys(groupedCourses).reduce((acc, subject) => {
    acc[subject] = groupedCourses[subject]
    .filter((course) => {
      return (course.name.toLowerCase().includes(searchQuery.toLowerCase()) || course.id == searchQuery) &&
      (!filterGradeLevel || course.gradeLevel === filterGradeLevel);
    });
    return acc;
  }, {});

  const handleEnroll = async (course) => {

    alert(`Enrolling in ${course.name}...`);
    UID = "fGqBLJ05CtRQpfAbN8N2k06AOEm2"

    try {
      const response = await fetch('http://localhost:3001/enrollCourse', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({CID: course.id}),
      });

      if (!response.ok) {
          throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses);
  } catch (error) {
      console.error('Error fetching courses:', error);
  }


    
  };

  useEffect(() => {
    getCouses()
  }, []);

  const getCouses= async()=>{
    try {
      const response = await fetch('http://localhost:3001/getcourses', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses);
  } catch (error) {
      console.error('Error fetching courses:', error);
  }

  }

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-start">
            <Nav.Link as={Link} to="/studentdash">Home</Nav.Link>
            <Nav.Link as={Link} to="/coursespage">All Courses</Nav.Link>
            <Nav.Link as={Link} to="/assignments">Assignments</Nav.Link>
            <Nav.Link as={Link} to="/AI">AI</Nav.Link>
            <Nav.Link as={Link} to="">Report</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    <Container className="my-4 py-4">
      <Row>
        <Col xs={12} className="text-center">
          <h4 className="text-primary">Courses</h4>
        </Col>
        <Col xs={12}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search courses or ID"
              onChange={(e) => setSearchQuery(e.target.value)}
              />
            <InputGroup.Text id="basic-addon1" className="bg-warning text-dark">🔍</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={12}>
          <Form.Select
            aria-label="Filter by Grade Level"
            onChange={(e) => setFilterGradeLevel(e.target.value)}
            className="mb-3"
            >
             <option value="">All Grade Levels</option>
            <option value="Elementary School">Elementary School</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
          </Form.Select>
        </Col>
        {Object.keys(filteredCourses).map((subject) => (
          <Col xs={12} key={subject} className="my-3">
            <h5 className="text-info">{subject}</h5>
            <Row xs={1} sm={2} md={3} lg={4}>
              {filteredCourses[subject].length > 0 ? (
                filteredCourses[subject].map((course) => (
                  <Col key={course.id} className="mb-3">
                    <CourseListing
                      course={course}
                      onMouseEnter={() => setActiveSection(course.id)}
                      onMouseLeave={() => setActiveSection("")}
                      isActive={activeSection === course.id}
                      handleEnroll={handleEnroll}
                      enrolledCourses={enrolledCourses}
                      />
                  </Col>
                ))
                ) : (
                  <Col xs={12}>
                  <p className="text-muted">No results found</p>
                </Col>
              )}
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
        </>
  );
};

export default CoursesPage;
