
// This function is passed a database, User ID and a category ID and returns the list of items for a specific category ID for the current user sorted by the date the items were added.
const getItemsByCategory = (db, currentUserId, categoryId) => {
  const queryString = `SELECT * FROM items WHERE user_id = $1 AND category_id = $2 ORDER BY date_added;`;
  const queryParams = [currentUserId, categoryId];
  return db.query(queryString, queryParams);
};

// This function is passed a database and userID and returns the first_name for the specific userID
const getNameByUserId = (db, userId) => {
  const queryString = `SELECT first_name FROM users WHERE id = $1;`;
  const queryParams = [userId];
  return db.query(queryString, queryParams);
};

// This function is passed a string and it looks for specific words to help choose the proper category it belongs to.
const getCategoryId = (itemString) => {

  // make all characters lowercase to match easier and more accurately
  const lcItemStr = itemString.toLowerCase();

  if (lcItemStr.includes('watch') || lcItemStr.includes('season') || lcItemStr.includes('tv') || lcItemStr.includes('movie') || lcItemStr.includes('episode')) {
    // if the ToDo item contains one of these words, it should be categorized as film/TV series
    return 1;
  } else if (lcItemStr.includes('eat') || lcItemStr.includes('food') || lcItemStr.includes('kitchen') || lcItemStr.includes('bar') || lcItemStr.includes('restaurant') || lcItemStr.includes('dine') || lcItemStr.includes('breakfast') || lcItemStr.includes('lunch') || lcItemStr.includes('dinner')) {
    // if the ToDo item contains one of these words, it should be categorized as restaurant/cafe
    return 2;
  } else if (lcItemStr.includes('read') || lcItemStr.includes('chapter') || lcItemStr.includes('book') || lcItemStr.includes('author') || lcItemStr.includes('fiction') || lcItemStr.includes('biography') || lcItemStr.includes('paperback') || lcItemStr.includes('novel') || lcItemStr.includes('text')) {
    // if the ToDo item contains one of these words, it should be categorized as books
    return 3;
  } else if (lcItemStr.includes('buy') || lcItemStr.includes('purchase') || lcItemStr.includes('lease') || lcItemStr.includes('own') || lcItemStr.includes('store') || lcItemStr.includes('mall') || lcItemStr.includes('shop') || lcItemStr.includes('obtain') || lcItemStr.includes('acquire')) {
    // if the ToDo item contains one of these words, it should be categorized as things to buy
    return 4;
  }
  // Otherwise put it in the uncategorized column
  return 5;
};

module.exports = {
  getItemsByCategory,
  getNameByUserId,
  getCategoryId
};