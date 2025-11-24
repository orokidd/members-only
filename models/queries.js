const pool = require("./pool");

async function getAllPosts() {
  const query = `SELECT 
  users.fullname,
  posts.id,
  posts.title,
  posts.content,
  posts.created_at,
  posts.user_id
  FROM posts
  INNER JOIN users ON posts.user_id = users.id
  ORDER BY posts.created_at DESC`
  
  const { rows } = await pool.query(query)
  return rows;
}

async function getUserPosts(userId) {
  const query = "SELECT users.fullname, posts.id, posts.title, posts.content, posts.created_at FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id = $1 ORDER BY posts.created_at DESC"
  const { rows } = await pool.query(query, [userId])
  return rows;
}

async function getPostById(postId) {
    const query = "SELECT posts.id, posts.title, posts.content, posts.created_at, posts.user_id, users.fullname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = $1 ORDER BY posts.created_at DESC";
    const { rows } = await pool.query(query, [postId]);
    return rows[0];
}

async function editPost(postId, newPostData) {
  const query = "UPDATE posts SET title = $1, content = $2 WHERE id = $3"
  await pool.query(query, [newPostData.title, newPostData.content, postId])
}

async function newPost(postData) {
  const query = "INSERT INTO posts (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())";
  await pool.query(query, [postData.title, postData.content, postData.userId ])
}

async function deletePost(postId) {
  const query = "DELETE FROM posts WHERE id = $1";
  await pool.query(query, [postId])
}

async function newUser(newUserData) {
  const query = "INSERT INTO users (fullname, username, password_hash) VALUES ($1, $2, $3)"
  await pool.query(query, [newUserData.fullname, newUserData.username, newUserData.password_hash])
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

module.exports = {
  getAllPosts,
  deletePost,
  checkMembership,
  changeMemberStatus,
  newPost,
  newUser,
  getUserPosts,
  getPostById,
  editPost
};
