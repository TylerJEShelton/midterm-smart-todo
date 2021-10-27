/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
//routes for /api/users/...
// const userId = req.session.user_id;


const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
// select all users from DB
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        // console.log(data.rows);
        // console.log("test");
        res.render("index.ejs", {users:users});
      })
      .catch(err => { 
        res
          .status(500)
          .json({ error: err.message });
      });
  });

//show login form
router.get('/login', (req, res) => {
  res.render("login.ejs");
});

//show register form
router.get('/register', (req, res) => {
  res.render("register.ejs", {error:''});
});

//proces login form --------
router.post('/login', async (req, res) => {
  const inputEmail =  req.body.email;
  // console.log('req.body.email' ,req.body.email);
  
  const inputPassword =  req.body.password; 
  const userInput = [inputEmail];
  const query = `SELECT first_name, email, password FROM users WHERE email = $1`;

    try {  
      const dbResult = await db.query(query, userInput);
      // console.log('dbResult.rows', dbResult.rows);
      if(dbResult) {
       const dbPassw = dbResult.rows[0].password;
       const passwMatch = await bcrypt.compareSync(inputPassword, dbPassw);
         if (passwMatch) {
          //  console.log("passw matched");
          const username = dbResult.rows[0].first_name;
          req.session.user = {name: username,  email: inputEmail};
           res.render('index.ejs', { name: username,
            email: inputEmail });
         }
      } else {
       res.render("login.ejs", {error: "Incorrect username or password"});
      }
     } 
     catch (err) {
       res
       .status(500)
       .json({ error: err.message });
     }   
});

//clear a cookie on logout
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/api/users/login');
});


// create user; one route can make several DB queries
  //call DB to see of user exists
  router.post('/register', async (req, res) => {
    const inputEmail =  req.body.email;
    console.log('inputEmail:' ,inputEmail);
   
    const userInputCheck = [inputEmail];
    const queryCheck = `SELECT email FROM users WHERE email = $1`;
  
      try {  
        const dbResult = await db.query(queryCheck, userInputCheck);
        console.log(dbResult.rows);
        
        if(dbResult.rows.length > 0) {
            // console.log('user exists: ', dbResult);
           res.render('register.ejs', { error: "email already in use" });
        } 
        else {
          // console.log('user does not exist');
         const queryInsert = `INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3)`;
         const userName = req.body.name;
         const userPassword = await bcrypt.hashSync(req.body.password, 10) ;
         const userInputInsert = [userName, inputEmail, userPassword ];
         const dbInsert = await db.query(queryInsert, userInputInsert);
         if (dbInsert) {
          // console.log('record inserted into DB');
          req.session.user = {name: userName,  email: inputEmail};
          res.render('index.ejs', { name: userName,
            email: inputEmail });
         }
         else{
          res.render("register.ejs", {error: "Problem registering a new user"});
         }
        }
       } 
       catch (err) {
         res
         .status(500)
         .json({ error: err.message });
       }   
  });

  //:id route for logged in user to show his data
  run DB query to pull user's data from DB
  send data to new .ejs file

  // post route to make API call using dat from the search from
  axio API call from back end
  run SQL query to add api data to DB

  return router;
};

// once user is logged in i redirect him to this route to show his data from DB:
// user/:id to display data from DB for current user


