const pool = require('../db_connection')
const  {v4:uuidv4} = require('uuid')

const registerUser = (name,email,hashPassword,role,callback)=>{
    const id = uuidv4();
    const query = `INSERT INTO users (id,name,email,password,role) VALUES ($1,$2,$3,$4,$5)`;
    const values = [id,name,email,hashPassword,role];
    pool.query(query,values,callback);
}

const loginUser = (email,callback)=>{
    const query = `SELECT * FROM users WHERE email=$1`;
    const value = [email];
    pool.query(query,value,callback);
}

module.exports = {registerUser , loginUser}