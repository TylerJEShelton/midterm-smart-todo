/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    req.session.userID = req.params.id;
    res.redirect("/");
  });
  return router;
};
