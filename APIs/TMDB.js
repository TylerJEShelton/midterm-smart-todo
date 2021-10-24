const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb("5697c86773b696d2d13b1748d6445604");

moviedb
  .searchMovie({ query: "The Shawshank Redemption" })
  .then((res) => {
    console.log(res);
  })
  .catch(console.error);
