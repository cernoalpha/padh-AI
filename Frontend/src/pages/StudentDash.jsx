import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { blue } from "@mui/material/colors";

const AttendanceChart = () => {
  const attendanceData = [
    { subject: 'Maths', attendance: 5, totalClasses: 7 },
    { subject: 'Science', attendance: 9, totalClasses: 10 },
    { subject: 'English', attendance: 9, totalClasses: 15 },
    { subject: 'SST', attendance: 5, totalClasses: 10 },
    { subject: 'civics', attendance: 10, totalClasses: 10 },
  ];

  const data = attendanceData.map((item) => ({
    x: item.subject,
    y: (item.attendance / item.totalClasses) * 100,
  }));

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2) + '%';
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ data }]}
      type="bar"
      height={450}
    />
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { title: "New assignment uploaded", date: "March 7, 2023" },
    { title: "Upcoming class reminder", date: "March 8, 2023" },
  ]);
  const [upcomingClasses, setupcomingClasses] = useState([{ date: "No data yet", time: "", tutor: "" }])

  const [attendanceRecords, setattendanceRecords] = useState([{ date: "No record Yet", status: "-" }])


  const documents = [
    { title: "Math Notes", date: "March 2, 2023" },
    { title: "Science Assignment", date: "March 5, 2023" },
  ];

  const handleLogout = () => {
    // Add your logout logic here
  };

  useEffect(() => {

    fetchSchedule();
    fetchStudentData();

  }, [])

  const fetchStudentData = async () => {
    try {
      const response = await fetch('http://localhost:3001/studentData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ uid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.Assignments)
      setattendanceRecords(data.Attendance)
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  }

  const fetchSchedule = async () => {
    try {
      const response = await fetch('http://localhost:3001/studentSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ uid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setupcomingClasses(data)
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
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

        <Row style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Col xs={12} md={6} lg={8}>
            <Card style={{ marginTop: "30px", backgroundColor: "#f5f5f5", borderRadius: "15px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
              <Card.Body>
                <h4 style={{ color: "#3498db", marginBottom: "20px", textAlign: "center", fontSize: "1.5rem" }}>Upcoming Classes</h4>
                {upcomingClasses.map((upcomingClass, index) => (
                  <div key={index} style={{ marginBottom: "15px", padding: "10px", borderRadius: "8px", backgroundColor: "#ffffff", cursor: "pointer", transition: "background-color 0.3s ease" }}
                    onClick={() => navigate("/class")}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#ffffff"}
                  >
                    <p style={{ color: "#333", margin: "0", fontWeight: "bold" }}>
                      {upcomingClass.date+ " "}{ upcomingClass.time} - {upcomingClass.title}-{upcomingClass.tutor}
                    </p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card style={{ marginTop: "30px" }}>
              <AttendanceChart />
            </Card>
          </Col>

        </Row>
        <Row style={{ marginTop: "30px", padding: "20px" }}><h4>Selected Courses</h4></Row>
        <div class="card-deck row" style={{ padding: "20px" }}>
          <div class="card col-lg-3 mx-5 text-center">
            <img class="card-img-top" src="..." alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
            </div>

          </div>
          <div class="card col-lg-3 mx-5 text-center">
            <img class="card-img-top" src="..." alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
            </div>

          </div>
          <div class="card col-lg-3 mx-5 text-center">
            <img class="card-img-top" src="..." alt="Card image cap"></img>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>

            </div>
          </div></div>


      </Container>
    </>

  );


};



export default Dashboard;
