const fetch = require('node-fetch');
const admin = require('./firebase');

const getenroll = async (req, res) => {
    try {
        // Assuming "Teacher" is your root node
        const teacherRef = admin.database().ref('Teacher');
    
        const snapshot = await teacherRef.once('value');
        const teacherData = snapshot.val();
    
        // Object to store the transformed data organized by subject
        const organizedData = {};
    
        // Loop through each teacher UID
        Object.keys(teacherData).forEach((teacherUid) => {
          const courses = teacherData[teacherUid].courses;
    
          // Loop through each course
          Object.keys(courses).forEach((courseId) => {
            const course = courses[courseId];
    
            // Create a new course object with the necessary information
            const transformedCourse = {
              id: courseId,
              name: course.name,
              gradeLevel: course.gradeLevel,
              teacherName: course.teacherName,
              description: course.description,
            };
    
            // Get the subject for the current course
            const subject = course.subject;
    
            // If the subject doesn't exist in the organizedData object, create an array for it
            if (!organizedData[subject]) {
              organizedData[subject] = [];
            }
    
            // Push the transformed course to the array of the corresponding subject
            organizedData[subject].push(transformedCourse);
          });
        });
    
        // Now 'organizedData' contains the data in the specified format
        res.status(200).json({ courses: organizedData});
      } catch (error) {
        console.error('Error fetching and transforming data:', error);
      }
  };

  module.exports = { getenroll } 