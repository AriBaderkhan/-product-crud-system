const pool = require('../db_connection');

const addUser = (username, email, hashPassword, age, callback) => {
    const query = `INSERT INTO students (username,email,password,age) VALUES ($1,$2,$3,$4)`;
    const values = [username, email, hashPassword, age];
    pool.query(query, values, callback);
}

const showAllUsers = (callback) => {
    const query = `SELECT * FROM students`;
    pool.query(query, callback);
}

const showAUser = (id, callback) => {
    const query = `SELECT * FROM students WHERE id=$1`;
    const value = [id];
    pool.query(query, value, callback);
}

const deleteAUser = (id, callback) => {
    const query = `DELETE FROM students WHERE id=$1 RETURNING *`;
    const value = [id];
    pool.query(query, value, callback);
}

const updateUser = (id, data, callback) => {
    const keys = Object.keys(data);

    const setCluase = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');

    const query = `UPDATE students SET ${setCluase} WHERE id=$${keys.length + 1} RETURNING *`;
    const values = [...keys.map(key => data[key]), id];
    pool.query(query, values, callback)
}

module.exports = { addUser, showAllUsers, showAUser, deleteAUser, updateUser }