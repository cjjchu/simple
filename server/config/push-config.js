'use strict';

const fs = require('fs');
const path = require('path');

// Replace with your unique name
exports.appName = 'zAdvisorApplication';

// Use your own Server Key as generated by Google Developer Console
// For more details, see http://developer.android.com/google/gcm/gs.html
// exports.gcmServerApiKey = 'AIzaSyAZwvfWAk1umq22ylawLSzV_Ju0oLj2jy4';
exports.gcmServerApiKey = 'AIzaSyDBmPONPNapZhrIkClxj6TRLoe5LBnIIq0';

function readCredentialsFile(name) {
  return fs.readFileSync(
    path.resolve(__dirname, 'credentials', name),
    'UTF-8'
  );
}

// You may want to use your own credentials here
exports.apnsCertData = readCredentialsFile('apns-pro-cert.pem');
exports.apnsKeyData = readCredentialsFile('apns-pro-key.pem');
