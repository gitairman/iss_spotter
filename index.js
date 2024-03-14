const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('154.20.168.220', (err, data) => {
//   if (err) console.log(err.message);
//   else console.log(data);
// });

fetchISSFlyOverTimes(
  { latitude: '49.27670', longitude: '-123.13000' },
  (err, data) => {
    if (err) console.log(err.message);
    else console.log(data);
  }
);
