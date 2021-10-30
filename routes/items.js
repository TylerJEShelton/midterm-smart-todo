const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const {
    getItemsByCategory,
    getUserByEmail,
    getCategoryId,
    loginChecker,
    updateCategory,
    deleteItem
  } = require("../lib/data_helpers");

  const { books } = require("../APIs/googleBooks");
  const { moviedb } = require("../APIs/TMDB");
  const { client } = require("../APIs/yelp");


  router.get("/", (req, res) => {

    if (req.session.email) {
      let email = req.session.email;
      getUserByEmail(db, email).then((responce) => {
        let user = responce.rows[0];
        const curUserId = user.id;
        Promise.all([
          getItemsByCategory(db, curUserId, 1),
          getItemsByCategory(db, curUserId, 2),
          getItemsByCategory(db, curUserId, 3),
          getItemsByCategory(db, curUserId, 4),
          getItemsByCategory(db, curUserId, 5),
        ]).then((data) => {
          const templateVars = {
            films: data[0].rows,
            restaurants: data[1].rows,
            books: data[2].rows,
            products: data[3].rows,
            other: data[4].rows,
          };

          let user = null;

          if (req.session.first_name) {
            user = { first_name: req.session.first_name };
          }
          templateVars.user = user;
          res.render("main", templateVars);
        });
      });
    }
    if (!req.session.email) {
      res.redirect("/login");
    }
  });

  router.post("/", (req, res) => {
    let email = req.session.email;
    getUserByEmail(db, email).then((responce) => {
      let user = responce.rows[0];
      const title = req.body.title;
      const userId = user.id;
      const categoryId = getCategoryId(title);
      const dateAdded = new Date().toISOString().slice(0, 19).replace("T", " ");
      const description = req.body.description;

      const queryString = `INSERT INTO items (title, user_id, category_id, date_added, description) VALUES ($1, $2, $3, $4, $5);`;
      const queryParams = [title, userId, categoryId, dateAdded, description];

      db.query(queryString, queryParams).then((data) => {
        res.redirect("/");
      });
    });
  });

  router.get("/new", (req, res) => {
    const user = loginChecker(req, res);
    const templateVars = { user };
    res.render("items-new", templateVars);
  });

  router.post("/new", (req, res) => {
    const key = req.body.key;
    books.search(key, function(error, results) {
      if (!error) {
        const book = {
          a: results[0],
          b: results[1],
          c: results[2],
          d: results[3],
        };
        moviedb.searchMovie({ query: key }).then((results1) => {
          const movie = {
            a: results1.results[0],
            b: results1.results[1],
            c: results1.results[2],
            d: results1.results[3],
          };
          let movieImg = {};
          for (let i in movie) {
            if (movie[i]) {
              movieImg[i] =
                "https://image.tmdb.org/t/p/" + "w200" + movie[i].poster_path;
            }
          }
          client
            .search({
              term: key,
              latitude: 43.65391,
              longitude: -79.38429,
            })
            .then((results2) => {
              const restaurant = {
                a: JSON.parse(results2.body).businesses[0],
                b: JSON.parse(results2.body).businesses[1],
                c: JSON.parse(results2.body).businesses[2],
                d: JSON.parse(results2.body).businesses[3],
              };
              const user = loginChecker(req, res);
              const templateVars = { user, book, movie, movieImg, restaurant };
              res.render("items-new-result", templateVars);
            });
        });
      } else {
        console.log(error);
      }
    });
  });

  router.post("/add", (req, res) => {
    console.log(req.body);
  });

  router.post("/update-category", async (req, res) => {
    const newCat = req.body.new_category;
    const userId = req.body.userid;
    const itemId = req.body.itemid;
    await updateCategory(db, newCat, userId, itemId)
    res.redirect("/items");
  });

  router.post("/delete-item", async (req, res) => {
    const userId = req.body.userid;
    const itemId = req.body.itemid;
    await deleteItem(db, userId, itemId)
    res.redirect("/items");
  });

  return router;
};
