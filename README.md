SMART TODO APP
=========

Smart ToDo is a multi-page app that allows users to track things that they need to do while automatically categorizing those tasks.  The user is then able to switch the category it has been moved to and delete the task when it is complete.  The user is also able to search for a book, movie or restaurant using a keyword and then add one of the results to their list of to-do items.

This app was built by [Andriy](https://github.com/Andriy-Lyt), [Haoyan](https://github.com/yuhaoyann) and [Tyler](https://github.com/TylerJEShelton) as our midterm project for [Lighthouse Labs Web Development Flex Progam](https://www.lighthouselabs.ca/en/web-development-flex-program).

## Screenshots

!["SMART TODO Main Page"](https://github.com/TylerJEShelton/midterm-smart-todo/blob/master/screenshots/main.png?raw=true)
!["SMART TODO Edit Item"](https://github.com/TylerJEShelton/midterm-smart-todo/blob/master/screenshots/edit_item.png?raw=true)
!["SMART TODO Search Results"](https://github.com/TylerJEShelton/midterm-smart-todo/blob/master/screenshots/search_function.png?raw=true)
!["SMART TODO Login Page"](https://github.com/TylerJEShelton/midterm-smart-todo/blob/master/screenshots/login.png?raw=true)
!["SMART TODO Registration Page"](https://github.com/TylerJEShelton/midterm-smart-todo/blob/master/screenshots/registration.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- bcrypt ^5.0.1
- chalk ^2.4.2
- cookie-session ^1.4.0
- dotenv ^2.0.0
- ejs ^2.6.2
- express ^4.17.1
- google-books-search ^0.3.1
- method-override ^3.0.0
- morgan ^1.9.1
- moviedb-promise ^3.1.11
- pg ^8.5.0
- pg-native ^3.0.0
- sass ^1.43.4
- yelp-fusion ^3.0.0
- node ^10.x
- npm ^5.x


## Dev Dependencies

- Nodemon 2.0.10 or above
