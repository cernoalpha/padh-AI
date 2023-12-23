const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const admin = require('./firebase');



const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;
app.use(cors());


const { teacherData } = require('./teacherData');
const { meetings } = require('./meetings');
const { addcourse } = require('./addCourse');
const { getcourse } = require('./getCourse');
const { getenroll } = require('./getCourses');
const { enrollcourse } = require('./enrollCourse');
// const { getenroll } = require('./getCourses');

const getSchedule = async (req, res) => {
  // const { uid } = req.body; 
  uid = "Qx6IXR2UEgQPGlGyCr0SmhhIvio2"

  try {
    const snapshot = await admin.database().ref(`/Schedule/${uid}`).once('value');
    const schedule = snapshot.val();
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching upcoming sessions:", error);
    throw error;
  }
}
const getstudentData = async (req, res) => {
  // const { uid } = req.body; 
  uid = "Qx6IXR2UEgQPGlGyCr0SmhhIvio2"
  try {
    const snapshot = await admin.database().ref(`/Student/${uid}`).once('value');
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
}

app.post("/addcourse", addcourse)
app.post("/getcourse", getcourse)
app.post("/getcourses", getenroll)
app.post("/enrollCourse", enrollcourse)


app.post('/studentData', getstudentData);
app.post('/studentSchedule', getSchedule);
app.post('/teacherData', teacherData);
app.post('/meetings', meetings);

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const API_KEY = "AIzaSyCl9_IV6lYspkx4sYL7nZl-xhZj8yfh2EA";
const genAI = new GoogleGenerativeAI(API_KEY);

const chatting = async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);

  const sessionsText = `
Session 1:
Date: Dec 23, 2023
Subject: Computer Science
Time: 10:00 AM - 11:00 AM
Title: Linear Regression
Tutor: Jane Doe
Description: Decision Tree Algorithm

Session 2:
Date: Dec 23, 2023
Subject: History
Time: 2:00 PM - 3:00 PM
Title: French Revolution
Tutor: John Smith
Description: Tennis Court Oath
`;


  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: `I had attended two classes today first Computer Science in which i studied  Linear Regression and the topics covered were  Decision Tree Algorithm  and in History class  the title French Revolution and the topics  Tennis Court Oath was covered `,
        },
        {
          role: "model",
          parts: "Thats great now i am certain !"
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const msg = prompt.message;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, text });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

app.post('/chat', chatting)

app.get('/', (req, res) => {
  res.status(200).contentType('text/plain').send('Server shaddy is healthy 😀🥳');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
