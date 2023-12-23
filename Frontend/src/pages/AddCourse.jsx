import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCreationPage = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        subject: 'Select Subject',
        name: '',
        gradeLevel: '',
        teacherName: '',
        description: '',
        teacherId: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch('http://localhost:3001/addcourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            alert('Course created successfully');
            setFormData({
                subject: 'Select Subject',
                name: '',
                gradeLevel: '',
                teacherName: '',
                description: '',
            });
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const CourseGrid = ({ courses }) => (
        <div className="my-4 py-4 text-center">
        <h1 className="text-primary">Your Courses</h1>
        <Row className="justify-content-center">
          {courses.map((course) => (
            <Col key={course.id} md={4}>
              <div className="border rounded p-4 mb-4 shadow-sm">
                <h3 className="text-info">{course.name}</h3>
                <p><strong>Subject:</strong> {course.subject}</p>
                <p><strong>Grade Level:</strong> {course.gradeLevel}</p>
                <p><strong>Description:</strong> {course.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
      

    const fetchAvailableCourses = async () => {
        try {
            const response = await fetch('http://localhost:3001/getcourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const data = await response.json();
            console.log(data)
            setCourses(data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        console.log("lol")
        fetchAvailableCourses();
    }, []);


    return (
        <>
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

      <Container className="my-4 py-4">
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <h1 className="text-primary">Create a Course</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  as="select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  readOnly
                  className="mb-3"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business">Business</option>
                  <option value="Arts">Arts</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="gradeLevel">
                <Form.Label>Grade Level</Form.Label>
                <Form.Control
                  as="select"
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  required
                  className="mb-3"
                >
                  <option value="">Select Grade Level</option>
                  <option value="High School">High School</option>
                  <option value="Elementary School">Elementary School</option>
                  {/* Add more grade levels as needed */}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-3">
                Create Course
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <CourseGrid courses={courses} />
    </>

    );
};

export default CourseCreationPage;

