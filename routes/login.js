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
    let user = null;
    if (req.session.first_name) {
      user = { first_name: req.session.first_name };
    }
    const templateVars = { user };
    res.render("login", templateVars);
  });

  router.post("/", (req, res) => {
    req.session.first_name = "haoyan";
    res.redirect("/items");
  });

  router.post("/logout", (req, res) => {
    req.session.first_name = null;
    res.redirect("/items");
  });

  return router;
};
