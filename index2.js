const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) =>
    passTimes.forEach(({ risetime, duration }) =>
      console.log(
        `Next pass at ${new Date(
          Date.now() + risetime
        )} for ${duration} seconds!`
      )
    )
  )
  .catch((err) => console.log(`It didn't work: `, err.message));
