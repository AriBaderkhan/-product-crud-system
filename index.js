const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require('helmet');
const cors = require('cors');
// const xss = require('xss-clean');

const productRoutes = require('./routes/productRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

const { emitter, logMorgan } = require("./logger_system");
app.use(morgan("combined", { stream: logMorgan }));

const PORT = 1234;
app.use(helmet());
app.use(cors());
// app.use(xss());
app.use(express.json());



app.use('/products',productRoutes); // the core for product
app.use('/students',studentRoutes); // the core for student
app.use('/auth',authRoutes); // the core for user register/login

app.use((req, res) => {
    res.status(404).send("Oops.. Something went wrong!");
    const date = new Date().toLocaleString();
    emitter.emit("logs",`User trying something but faceed Not Found 404 at ${date}`);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Server Error: Please check the backend logs for more info.");
    const date = new Date().toLocaleString();
    emitter.emit("logs",`Server Error: Please check the backend logs for more info. at ${date}`);
});

app.listen(PORT, () => {
    console.log(`Server Runing on Port ${PORT}`);
});