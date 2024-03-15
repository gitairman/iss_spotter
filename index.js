const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passTimes.forEach(({ risetime, duration }) =>
    console.log(
      `Next pass at ${new Date(Date.now() + risetime)} for ${duration} seconds!`
    )
  );
});
