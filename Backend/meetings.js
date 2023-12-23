const fetch = require('node-fetch');

const meetings = async (req,res)=>{
    const { uid } = req.body; 
    try {
        const snapshot = await admin.database().ref(`/teacherData/${uid}`).once('value');
        const meetings = snapshot.val();
        res.status(200).json(meetings);
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        throw error;
      }
}

module.exports = { meetings };