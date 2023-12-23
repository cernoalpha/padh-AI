import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

// Import icons
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';




import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const styles = {
  container: {
    marginTop: 20,
  },
  form: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  addStudentButton: {
    marginBottom: 15,
  },
  studentsList: {
    padding: 20,
  },
  studentItem: {
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  studentName: {
    flexGrow: 1,
  },
  studentSubmittedFile: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
  },
  submitButton: {
    marginTop: 10,
  },
};

const AssignmentSettings = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAddStudent = () => {
    setAnchorEl(null);
    setSelectedStudents([...selectedStudents, students[0]]);
  };

  const handleRemoveStudent = (student) => {
    setSelectedStudents(selectedStudents.filter((s) => s !== student));
  };

  const handleSendAssignment = () => {
    // Send the assignment to the selected students
    const assignment = {
      id: 1,
      title,
      description,
      dueDate,
      completed: false,
    };

    // Create an assignment object for each selected student
    const studentAssignments = selectedStudents.map((student) => ({
      assignmentId: assignment.id,
      studentId: student.id,
      submittedFile: null,
      completed: false,
    }));

    // Send the assignment and student assignments to the server
  };

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

        <Grid container spacing={2} sx={styles.container}>
      {/* Assignment Form */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={styles.form}>
          <Typography variant="h5" sx={styles.title}>
            Create Assignment
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={styles.input}
          />
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={styles.input}
          />
          <TextField
            label="Due Date"
            variant="outlined"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={styles.input}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={styles.addStudentButton}
          >
            Add Student
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            {students.map((student) => (
              <MenuItem key={student} onClick={() => handleAddStudent(student)}>
                {student}
              </MenuItem>
            ))}
          </Menu>
        </Paper>
      </Grid>

      {/* Students List */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={styles.studentsList}>
          <Typography variant="h5" sx={styles.title}>
            Students
          </Typography>
          <List>
            {selectedStudents.map((student) => (
              <ListItem key={student} sx={styles.studentItem}>
                <ListItemButton>
                  <Avatar sx={styles.avatar}>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText primary={student} sx={styles.studentName} />
                </ListItemButton>
                <div sx={styles.studentSubmittedFile}>
                  <FileUploadIcon />
                  <Typography>Submitted File</Typography>
                </div>
                <Checkbox />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={styles.submitButton}
            onClick={handleSendAssignment}
          >
            Send Assignment
          </Button>
        </Paper>
      </Grid>
    </Grid>

    </>
  );
};

export default AssignmentSettings;
