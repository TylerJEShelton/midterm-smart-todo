/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const bcrypt = require("bcrypt");
  const { getUserByEmail } = require("../lib/data_helpers");

  router.get("/", (req, res) => {
    let user = null;
    if (req.session.first_name) {
      user = { first_name: req.session.first_name };
    }
    const templateVars = { user };
    res.render("login", templateVars);
    // console.log("req.session", req.session); 
  });

  router.post("/", (req, res) => {
    let email = req.body.email;
    getUserByEmail(db, email).then((responce) => {
      let user = responce.rows[0];
      if (req.body.email === "") {
        res.status(400).send("email cannot be empty");
        return;
      }
      if (!user) {
        res.status(400).send("email not registered");
        return;
      }
      if (req.body.password === "") {
        res.status(400).send("password cannot be empty");
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.first_name = user.first_name;
        req.session.email = user.email;
        res.redirect("/items");
        return;
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(403).send("incorrect password");
        return;
      }
    });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/items");
  });

  return router;
};
