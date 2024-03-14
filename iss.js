/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

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

    const coords = { latitude: data.latitude, longitude: data.longitude };
    return callback(null, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
