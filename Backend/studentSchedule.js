const fetch = require('node-fetch');

const studentSchedule = async (req, res) => {
  
  const uid  = "Qx6IXR2UEgQPGlGyCr0SmhhIvio2"

  try {
    const snapshot = await admin.database().ref(`/Schedule/${uid}`).once('value');
    const schedule = snapshot.val();
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching upcoming sessions:", error);
    throw error;
  }
}

// module.exports = { studentSchedule };