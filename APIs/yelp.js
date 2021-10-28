"use strict";

// need to fetch user latitude and longitude through html (not working in JS)

const yelp = require("yelp-fusion");
const client = yelp.client(
  "y_JnD1ORLQ-Ted6FCdLfAOIf3jAbHvLqwslfYY_EPACxLQK3u6QXWCba2ZYV_ufVXxmgwYKZ2L67q3LLcJDHs1F5k-yIp_bDHNKgG4SBDZ_orp5SlRrWaBYPWqt1YXYx"
);

// client
//   .search({
//     term: "Papa Chang's",
//     latitude: 43.89925,
//     longitude: -79.259125,
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

module.exports = { client };
