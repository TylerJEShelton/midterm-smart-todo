/*
 * All routes for Register are defined here
 * Since this file is loaded in server.js into /register,
 *   these routes are mounted onto /register
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  router.post("/", (req, res) => {
    const first_name = req.body.first_name;
    const email = req.body.email;
    const password = req.body.password;

    const queryString = `INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3);`
    const queryParams = [first_name, email, password];

    db.query(queryString, queryParams)
      .then(() => {
        db.query(`SELECT id FROM users WHERE email = $1`, [email])
          .then(data => {
            const userID = data.rows[0].id;
            req.session.userID = userID;
            console.log(req.session.userID);
            res.redirect("/");
          })
      })
  });

  return router;
};
