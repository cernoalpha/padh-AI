const admin = require('firebase-admin');
const serviceAccount = require('./account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kchat-6d40c-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = admin;
