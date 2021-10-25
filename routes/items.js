const express = require("express");
const router = express.Router();
const {
  getItemsByCategory,
  getNameByUserId,
  getCategoryId,
} = require("../lib/data_helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    req.session.userID = 1;
    const curUserId = req.session.userID;
    Promise.all([
      getItemsByCategory(db, curUserId, 1),
      getItemsByCategory(db, curUserId, 2),
      getItemsByCategory(db, curUserId, 3),
      getItemsByCategory(db, curUserId, 4),
      getItemsByCategory(db, curUserId, 5),
      getNameByUserId(db, curUserId),
    ]).then((data) => {
      const templateVars = {
        films: data[0].rows,
        restaurants: data[1].rows,
        books: data[2].rows,
        products: data[3].rows,
        other: data[4].rows,
        first_name: data[5].rows[0].first_name,
      };
      res.render("main", templateVars);
    });
  });

  router.post("/", (req, res) => {
    const title = req.body.title;
    const userId = req.session.userID;
    const categoryId = getCategoryId(title);
    const dateAdded = new Date().toISOString().slice(0, 19).replace("T", " ");
    const description = req.body.description;

    const queryString = `INSERT INTO items (title, user_id, category_id, date_added, description) VALUES ($1, $2, $3, $4, $5);`;
    const queryParams = [title, userId, categoryId, dateAdded, description];

    db.query(queryString, queryParams).then((data) => {
      res.redirect("/");
    });
  });

  return router;
};
