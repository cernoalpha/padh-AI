import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FileEarmarkArrowUp } from "react-bootstrap-icons";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch("http://localhost:3001/studentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ uid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAssignments(data.Assignments);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const subjects = assignments ? Object.keys(assignments) : [];
  const [currentSubject, setCurrentSubject] = useState("All Subjects");
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  useEffect(() => {
    if (currentSubject === "All Subjects") {
      setFilteredAssignments(assignments ? Object.entries(assignments) : []);
    } else {
      setFilteredAssignments(
        assignments && assignments[currentSubject]
          ? [[currentSubject, assignments[currentSubject]]]
          : []
      );
    }
  }, [currentSubject, assignments]);

  const handleSubjectChange = (event) => {
    setCurrentSubject(event.target.value);
  };

  const handleUpload = (e) => {
    // Handle the file upload logic here.
  };

  const handleComplete = (assignmentId) => {
    // Handle the logic for marking an assignment as complete.
  };

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
    
      <Container fluid>
      <Row className="mt-4">
        <Col xs={12}>
          <h2 className="text-center text-primary">Assignment Tracker</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12}>
          <h4 className="text-info">Assignments</h4>
        </Col>
        <Col xs={12}>
          <Form>
            <Form.Group controlId="subjectSelect">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                value={currentSubject}
                onChange={handleSubjectChange}
              >
                <option value="All Subjects">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {filteredAssignments.map(([subject, assignmentsList]) => (
        <Row key={subject} className="mt-4">
          <Col xs={12}>
            <h5 className="text-success">{subject}</h5>
            <ListGroup>
              {assignmentsList.map((assignment) => (
                <ListGroup.Item key={assignment.id}>
                  <Row>
                    <Col>
                      <div>
                        <strong>{assignment.title}</strong>
                        <p>{assignment.description}</p>
                      </div>
                    </Col>
                    <Col className="text-right">
                      <p>{assignment.dueDate}</p>
                      <Form.Check
                        type="checkbox"
                        checked={assignment.completed}
                        onChange={() => handleComplete(assignment.id)}
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleUpload}
                      >
                        <FileEarmarkArrowUp /> Upload
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      ))}
    </Container>
      </>
  );
};

export default AssignmentPage;
