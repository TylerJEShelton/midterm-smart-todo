SELECT title, first_name, categories.name as category, description
FROM items
JOIN users ON users.id = user_id
JOIN categories ON categories.id = category_id;
