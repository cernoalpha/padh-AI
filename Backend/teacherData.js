const fetch = require('node-fetch');

const teacherData = async (req,res)=>{
    const { uid } = req.body; 
    try {
        const snapshot = await admin.database().ref(`/teacherData/${uid}`).once('value');
        const data = snapshot.val();
        res.status(200).json(data);
      } catch (error) {
        console.error("Error fetching upcoming sessions:", error);
        throw error;
      }
}

module.exports = { teacherData };