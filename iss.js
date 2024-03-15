const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org/?format=json`, (err, res, body) => {
    if (err) return callback(err, null);
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const { ip } = JSON.parse(body);
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (err, res, body) => {
    if (err) return callback(err, null);

    const data = JSON.parse(body);
    if (data.success === false) {
      const msg = `Success status was ${data.success}. Server message: ${data.message}`;
      return callback(Error(msg), null);
    }
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const coords = { latitude: data.latitude, longitude: data.longitude };
    return callback(null, coords);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function ({ latitude, longitude }, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`,
    (err, res, body) => {
      if (err) return callback(err, null);

      if (res.statusCode !== 200) {
        const msg = `Status code ${res.statusCode} when fetching ISS data. Response: ${body}`;
        return callback(Error(msg), null);
      }

      const { response } = JSON.parse(body);
      if (!response) return callback(Error('No response data!', null));

      return callback(null, response);
    }
  );
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err, null);

      fetchISSFlyOverTimes(coords, (err, nextPasses) => {
        if (err) return callback(err, null);

        return callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
