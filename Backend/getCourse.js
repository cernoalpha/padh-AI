const fetch = require('node-fetch');
const admin = require('./firebase');

const getcourse = async (req, res) => {
    try {
      const uid = 'fGqBLJ05CtRQpfAbN8N2k06AOEm2';
  
      if (!uid) {
        return res.status(400).json({ message: 'UID not provided' });
      }
  
      const databaseRef = admin.database().ref(`Teacher/${uid}/courses`);
  
      const snapshot = await databaseRef.once('value');
  
      const courses = [];
      snapshot.forEach((childSnapshot) => {
        const course = childSnapshot.val();
        courses.push(course);
      });
      console.log(courses)
      res.status(200).json({ courses });

    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = { getcourse } 