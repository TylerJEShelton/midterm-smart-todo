var books = require("google-books-search");

books.search(
  "Professional JavaScript for Web Developers",
  function (error, results) {
    if (!error) {
      console.log(results);
    } else {
      console.log(error);
    }
  }
);
