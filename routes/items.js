const express = require("express");
const router = express.Router();

module.exports = (db) => {

  const getItemsByCategory = (categoryId) => {
    const queryString = `SELECT * FROM items WHERE category_id = $1 ORDER BY date_added;`;
    const queryParams = [categoryId];
    return db.query(queryString, queryParams);
  }

  const getNameByUserId = (userId) => {
    const queryString = `SELECT first_name FROM users WHERE id = $1;`;
    const queryParams = [userId];
    return db.query(queryString, queryParams);
  }

  router.get("/", (req, res) => {
    Promise.all([
      getItemsByCategory(1),
      getItemsByCategory(2),
      getItemsByCategory(3),
      getItemsByCategory(4),
      getItemsByCategory(5),
      getNameByUserId(req.session.userID)
    ]).then(data => {
      const templateVars = {
        films: data[0].rows,
        restaurants: data[1].rows,
        books: data[2].rows,
        products: data[3].rows,
        other: data[4].rows,
        first_name: data[5].rows[0].first_name
      };
      res.render("main", templateVars);
    });
  })


  router.post("/", (req, res) => {
    const title = req.body.title;
    const userId = req.session.userID;
    const categoryId = 5;
    const dateAdded = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const description = req.body.description;

    const queryString = `INSERT INTO items (title, user_id, category_id, date_added, description) VALUES ($1, $2, $3, $4, $5);`;
    const queryParams = [title, userId, categoryId, dateAdded, description];

    db.query(queryString, queryParams)
      .then(data => {
        res.redirect("/");
      });

  })
  return router;
};
