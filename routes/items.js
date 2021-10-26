const express = require("express");
const router = express.Router();
const {
  getItemsByCategory,
  getUserByEmail,
  getCategoryId,
} = require("../lib/data_helpers");

module.exports = (db) => {
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
    if (!req.session.email) {
      res.redirect("/login");
      return;
    }
    let user = null;
    if (req.session.first_name) {
      user = { first_name: req.session.first_name };
    }
    const templateVars = { user };
    res.render("items-new", templateVars);
  });

  return router;
};
