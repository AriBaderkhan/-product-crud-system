const express = require("express");
const app = express();
const morgan = require("morgan");

const { emitter, logMorgan } = require("./logger_system");
const { readProduct, writeProduct } = require("./storage/store");

app.use(morgan("combined", { stream: logMorgan }));

const PORT = 1234;
app.use(express.json());

app.post("/addProduct", (req, res) => {
    const products = readProduct();
    const productBody = req.body;

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = {
        id: newId,
        ...productBody,
    };
    products.push(product);
    writeProduct(products);

    res.status(200).send("add bu bram");

    const date = new Date().toLocaleString();
    emitter.emit("logs", `Product Adeed Successfu;;y at ${date}`);
});

app.get("/showallProducts", (req, res) => {
    const products = readProduct();
    res.status(200).send(products);

    const date = new Date().toLocaleString();
    emitter.emit("logs", `User Saw all Products at ${date}`);
});

app.get("/showProduct/:id", (req, res) => {
    const products = readProduct();
    const id = Number(req.params.id);
    const findProduct = products.find((product) => product.id === id);

    const date = new Date().toLocaleString();

    if (!findProduct) {
        res.status(404).send("Product Not Found");
        emitter.emit(
            "logs",
            `User tried to see product with id ${id} but not found at ${date}`
        );
    } else {
        res.status(200).send(findProduct);
        emitter.emit("logs", `User Saw Product with id ${id} at ${date}`);
    }
});

app.put("/updateProduct/:id", (req, res) => {
    const products = readProduct();
    const updateProducts = req.body;
    const id = Number(req.params.id);
    const findIndex = products.findIndex((product) => product.id === id);

    const date = new Date().toLocaleString();

    if (findIndex === -1) {
        res.status(404).send("Product Not Found");
        emitter.emit(
            "logs",
            `User tried to update product with id ${id} but not found at ${date}`
        );
    } else {
        products[findIndex] = {
            ...products[findIndex],
            ...updateProducts,
        };
        writeProduct(products);

        res
            .status(200)
            .send(`Product with id ${id} Updated Successfully at ${date}`);
        emitter.emit("logs", `User Updated Product with id ${id} at ${date}`);
    }
});

app.delete("/deleteProduct/:id", (req, res) => {
    const products = readProduct();
    const id = Number(req.params.id);
    const findIndexDelete = products.findIndex((product) => product.id === id);

    const date = new Date().toLocaleString();

    if (findIndexDelete === -1) {
        res.status(404).send("Product Not Found");
        emitter.emit(
            "logs",
            `User tried to delete product with id ${id} but not found at ${date}`
        );
    } else {
        products.splice(findIndexDelete, 1);
        writeProduct(products);

        res
            .status(200)
            .send(`Product with id ${id} Deleted Successfully at ${date}`);
        emitter.emit("logs", `User Deleted Product with id ${id} at ${date}`);
    }
});

app.use((req, res) => {
    res.status(404).send("Not Found!");
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
