/*
 * All routes for Register are defined here
 * Since this file is loaded in server.js into /register,
 *   these routes are mounted onto /register
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const bcrypt = require("bcrypt");
  const { checkEmails } = require("../lib/data_helpers");

  router.get("/", (req, res) => {
    let user = null;
    if (req.session.first_name) {
      user = { first_name: req.session.first_name };
    }
    const templateVars = { user };
    res.render("register", templateVars);
  });

  router.put("/", (req, res) => {
    const email = req.body.email;
    const first_name = req.body.first_name;
    const password = bcrypt.hashSync(req.body.password, 10);

    checkEmails(db, email).then((responce) => {
      if (responce.rows[0]) {
        res.status(400).send("email registered");
        return;
      }
      if (req.body.email === "") {
        res.status(400).send("email cannot be empty");
        return;
      }
      if (req.body.first_name === "") {
        res.status(400).send("name cannot be empty");
        return;
      }
      if (req.body.password === "") {
        res.status(400).send("password cannot be empty");
        return;
      }

      const queryString = `INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3);`;
      const queryParams = [first_name, email, password];
      db.query(queryString, queryParams);

      req.session.first_name = first_name;
      res.redirect("/items");
    });
  });

  return router;
};
