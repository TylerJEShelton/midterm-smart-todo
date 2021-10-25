/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = { user: req.session.first_name };
    res.render("login");
  });

  router.post("/", (req, res) => {
    const queryString = `
    SELECT first_name
    FROM users
    WHERE users.email = $1
    `;
    const login_email = req.body.email;
    const queryParams = [login_email];

    db.query(queryString, queryParams).then((res) => {
      req.session.first_name = res.rows[0].first_name;
    });
  });

  return router;
};
