const { createProduct, getAllProduct, updateProduct, getProduct, deleteProduct } = require('../models/productModel')
const { emitter } = require('../logger_system');


const addProduct = (req, res) => {
    const { name, price, quantity, description } = req.body;
    const date = new Date().toLocaleString();

    createProduct(name, price, quantity, description, (err, result) => {
        if (err) return res.status(500).send("Server Error");
        res.status(200).send("Product Adeed Successfully");
        emitter.emit("logs", `Product Adeed Successfully at ${date}`);
    })
};

const showAllProduct = (req, res) => {

    getAllProduct((err, result) => {
        if (err) return res.status(500).send("Server Error");
        res.status(200).send(result.rows.map(product => ({
            ...product,
            price: `$${product.price}`
        })));
        const date = new Date().toLocaleString();
        emitter.emit("logs", `User Saw all Products at ${date}`);
    })
}

const showAProduct = (req, res) => {
    const id = Number(req.params.id);
    const date = new Date().toLocaleString();

    getProduct(id, (err, result) => {
        if (result.rows.length === 0) {
            res.status(404).send(`Product with id ${id} Not Found`);
            emitter.emit("logs", `User tried to see product with id ${id} but not found at ${date}`);
        } else {
            res.status(200).send(result.rows[0]);
            emitter.emit("logs", `User Saw Product with id ${id} at ${date}`);
        }

    })
}

const updateTheProduct = (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body
    const date = new Date().toLocaleString();

    getProduct(id, async (error, result) => {
        if (error) return res.status(500).send("Server Error");

        if (result.rows.length === 0) {
            emitter.emit("logs", `User tried to see the user with id ${id} but not found at ${date}`);
            return res.status(404).send(`User with id ${id} Not Found`);
        }
        if (Object.keys(updates).length === 0) {
            return res.status(200).send(`nothing updated with id ${id}`)
        }

        updateProduct(id, updates, (error, respond) => {
            if (error) return res.status(500).send("Server Error");

            res.status(200).send(`Product id ${id} Updated successfully`);
            emitter.emit("logs", `User Updated Product with id ${id} at ${date}`);

        })
    })
}

const deleteTheProduct = (req, res) => {
    const id = Number(req.params.id);
    const date = new Date().toLocaleString();

    deleteProduct(id, (err, result) => {
        if (result.rows.length === 0) {
            res.status(404).send(`Product with id ${id} Not Found`);
            emitter.emit("logs", `User tried to delete product with id ${id} but not found at ${date}`);
        } else {
            res.status(200).send(`Product id ${id} Deleted successfully`);
            emitter.emit("logs", `User Deleted Product with id ${id} at ${date}`);
        }
    })
}

module.exports = { addProduct, showAllProduct, showAProduct, updateTheProduct, deleteTheProduct }