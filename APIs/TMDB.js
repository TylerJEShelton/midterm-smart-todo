const { MovieDb } = require("moviedb-promise");
const moviedb = new MovieDb("5697c86773b696d2d13b1748d6445604");

moviedb
  .searchMovie({ query: "The Shawshank Redemption" })
  .then((res) => {
    console.log(res);
  })
  .catch(console.error);
// From result, backdrop_path and poster_path:
// url + file size + above path
// url: 'https://image.tmdb.org/t/p/'
// size: 'original' or 'w500' etc
// path: returned string from search result
// eg:
// 'https://image.tmdb.org/t/p/'+'w500'+'/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg'
// = 'https://image.tmdb.org/t/p/w500/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg'
