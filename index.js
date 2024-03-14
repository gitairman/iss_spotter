const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

fetchCoordsByIP('154.20.168.220', (err, data) => {
  if (err) console.log(err.message);
  else console.log(data);
});

// '154.20.168.220';
