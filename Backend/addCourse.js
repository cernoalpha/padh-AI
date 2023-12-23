const fetch = require('node-fetch');
const admin = require('./firebase');

const addcourse = async(req, res) =>{
  const formData = req.body;
  try {
    const uid = 'fGqBLJ05CtRQpfAbN8N2k06AOEm2';

    if (!uid) {
      return res.status(400).json({ message: 'UID not provided' });
    }

    const databaseRef = admin.database().ref(`Teacher/${uid}/courses`);

    const newCourseRef = await databaseRef.push(formData);

    console.log('Course created successfully:', newCourseRef.key);

    res.status(200).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }

  module.exports = { addcourse };