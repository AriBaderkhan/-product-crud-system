const pool = require('../db_connection');

const createProduct = (name,price,quantity,description,callback)=>{
    const query = 'INSERT INTO products (name,price,quantity,description) VALUES ($1,$2,$3,$4)';
    const values = [name,price,quantity,description];
    pool.query(query,values,callback)
}

const getAllProduct = (callback)=>{
    const query = 'SELECT * FROM products';
    pool.query(query,callback)
}

const updateProduct = (id, data , callback)=>{
    const keys = Object.keys(data)

    if (keys.length === 0) {
        return callback(new Error("No fields provided for update"));
    }

    const setCluase = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');

    const query = `UPDATE products SET ${setCluase} WHERE id=$${keys.length + 1} RETURNING *`;

    const values = [...keys.map(key => data[key] ), id];

    pool.query(query,values,callback)
}

const getProduct = (id,callback)=>{
    const query = 'SELECT * FROM products WHERE id=$1';
    const value = [id]
    pool.query(query,value,callback)
}

const deleteProduct = (id,callback)=>{
    const query = 'DELETE FROM products WHERE id=$1 RETURNING *';
    const value = [id]
    pool.query(query,value,callback)
}

module.exports = { createProduct , getAllProduct , updateProduct , getProduct , deleteProduct }