const express = require("express");
const app = express();
const morgan = require("morgan");

const { emitter, logMorgan } = require("./logger_system");
const { createProduct, getAllProduct, updateProduct, getProduct, deleteProduct } = require('./models/productModel')
app.use(morgan("combined", { stream: logMorgan }));

const PORT = 1234;
app.use(express.json());

app.post("/add", (req, res) => {
    const { name, price, quantity, description } = req.body.name;

    const date = new Date().toLocaleString();

    if (!name || !price) {
        emitter.emit("logs", `User didn't fill the name/price field at ${date}`);
        return res.status(400).send("❌ 'name' and 'price' are required fields");
    }

    createProduct(name, price, quantity, description, (err, result) => {
        if (err) return res.status(500).send("Server Error");
        res.status(200).send("Product Adeed Successfully");
        emitter.emit("logs", `Product Adeed Successfully at ${date}`);
    })
});

app.get("/showall", (req, res) => {

    getAllProduct((err, result) => {
        if (err) return res.status(500).send("Server Error");
        res.status(200).send(result.rows.map(product => ({
            ...product,
            price: `$${product.price}`
        })));
        const date = new Date().toLocaleString();
        emitter.emit("logs", `User Saw all Products at ${date}`);
    })
});

app.get("/show/:id", (req, res) => {
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
});

app.put("/update/:id", (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body
    const date = new Date().toLocaleString();

    updateProduct(id, updates, (err, result) => {
        if (result.rows.length === 0) {
            res.status(404).send(`Product with id ${id} Not Found`);
            emitter.emit("logs", `User tried to update product with id ${id} but not found at ${date}`);
        } else {
            res.status(200).send(`Product id ${id} Updated successfully`);
            emitter.emit("logs", `User Updated Product with id ${id} at ${date}`);
        }
    })
});

app.delete("/delete/:id", (req, res) => {
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
});

app.use((req, res) => {
    res.status(404).send("Oops.. Something went wrong!");
    const date = new Date().toLocaleString();
    emitter.emit(
        "logs",
        `User trying something but faceed Not Found 404 at ${date}`
    );
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res
        .status(500)
        .send("Server Error: Please check the backend logs for more info.");
    const date = new Date().toLocaleString();
    emitter.emit(
        "logs",
        `Server Error: Please check the backend logs for more info. at ${date}`
    );
});

app.listen(PORT, () => {
    console.log(`Server Runing on Port ${PORT}`);
});
