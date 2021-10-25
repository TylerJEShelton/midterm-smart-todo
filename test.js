//bcrypt
const bcrypt = require('bcrypt');

const hash = (plainpassw) => {
 return bcrypt.hashSync(plainpassw, 10);
}

// console.log("password", hash("password"));

//$2b$10$qJKvYPqNk4WgRQd0yRQlyOsN5VSoKqT5H1hbEAuLYMAsun7hDfT..

console.log(bcrypt.compareSync("password", "$2b$10$qJKvYPqNk4WgRQd0yRQlyOsN5VSoKqT5H1hbEAuLYMAsun7hDfT..")); // true);

/* UPDATE users
SET password = '$2b$10$qJKvYPqNk4WgRQd0yRQlyOsN5VSoKqT5H1hbEAuLYMAsun7hDfT..'
WHERE id between 1 and 3; */

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
