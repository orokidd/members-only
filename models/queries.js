const pool = require("./pool");

async function getAllPosts() {
  const query = `SELECT 
  users.fullname,
  posts.title,
  posts.content,
  posts.created_at
  FROM posts
  INNER JOIN users ON posts.user_id = users.id
  ORDER BY posts.created_at DESC`
  
  const { rows } = await pool.query(query)
  return rows;
}

async function newPost(postData) {
  const query = "INSERT INTO posts (user_id, title, content, created_at) VALUES ($1, $2, $3, NOW())";
  await pool.query(query, [postData.user_id, postData.title, postData.content])
}

async function checkMembership(userId) {
  const query = "SELECT role_id FROM users WHERE id = $1"
  const { rows } = await pool.query(query, [userId]);
  return rows[0];
}

async function changeMemberStatus(userId, newRole) {
  const query = "UPDATE users SET role_id = $1  WHERE id = $2"
  await pool.query(query, [newRole, userId])
}

async function getAllBooks() {
  const query = `
    SELECT
      books.id,
      books.title,
      books.author,
      books.published_year,
      books.isbn,
      books.description,
      books.pages,
      books.stock,
      books.image_url,
      COALESCE(ARRAY_AGG(genres.name) FILTER (WHERE genres.name IS NOT NULL), '{}') AS genres
    FROM books
    LEFT JOIN book_genres ON books.id = book_genres.book_id
    LEFT JOIN genres ON book_genres.genre_id = genres.id
    GROUP BY books.id
    ORDER BY books.title;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

async function getBookById(id) {
  const query = `
    SELECT
      books.id,
      books.title,
      books.author,
      books.published_year,
      books.isbn,
      books.description,
      books.pages,
      books.stock,
      books.image_url,
      COALESCE(ARRAY_AGG(genres.name) FILTER (WHERE genres.name IS NOT NULL), '{}') AS genres
    FROM books
    LEFT JOIN book_genres ON books.id = book_genres.book_id
    LEFT JOIN genres ON book_genres.genre_id = genres.id
    WHERE books.id = $1
    GROUP BY books.id
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

module.exports = {
  getAllBooks,
  getBookById,
  getAllPosts,
  checkMembership,
  changeMemberStatus,
  newPost
};
