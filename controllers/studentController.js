const pool = require("../db_connection");
const bcrypt = require("bcrypt");
const { addUser, showAllUsers, showAUser, deleteAUser, updateUser, } = require("../models/studentModel");
const { emitter } = require("../logger_system");

const createUser = async (req, res) => {
    const { username, email, password, age } = req.body;
    const date = new Date().toLocaleString();

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        addUser(username, email, hashPassword, age, (err, result) => {
            if (err) {
                if (err.code === "23505") {
                    emitter.emit("logs", `User tried to register with exist emails field at ${date}`);
                    return res.status(400).send("Email already exists");
                }
                return res.status(500).send("Server Error");
            }
            res.status(200).send("User Registered Successfully");
            emitter.emit("logs", `User Added Successfully at ${date}`);
        });
    } catch (error) {
        res.status(500).send("Hashing failed");
    }
}

const getAllUsers = (req, res) => {
    const date = new Date().toLocaleString();
    showAllUsers((err, result) => {
        if (err) return res.status(500).send("Server Error");

        res.status(200).send(result.rows.map(({ password, ...rest }) => ({
            ...rest,
        })));
        emitter.emit("logs", `All Users showed Successfully at ${date}`);
    });

};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const date = new Date().toLocaleString();
    showAUser(id, (err, result) => {
        if (result.rows.length === 0) {
            res.status(404).send(`User with id ${id} Not Found`);
            emitter.emit("logs", `User tried to see the user with id ${id} but not found at ${date}`);
        } else {
            res.status(200).send(
                result.rows.map(({ password, ...rest }) => ({
                    ...rest,
                }))
            );
            emitter.emit("logs", `User Saw Product with id ${id} at ${date}`);
        }
    });
};

const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const date = new Date().toLocaleString();
    deleteAUser(id, (err, result) => {
        if (result.rows.length === 0) {
            res.status(404).send(`User with id ${id} Not Found`);
            emitter.emit("logs", `User tried to delete the user with id ${id} but not found at ${date}`);
        } else {
            res.status(200).send(`User with ${id} Deleted Successfully`);
            emitter.emit("logs", `User with id ${id} Deleted Successfully at ${date}`);
        }
    });
};

const updatingUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedDetail = req.body;
    const date = new Date().toLocaleString();


    showAUser(id, async (error, result) => {
        if (error) return res.status(500).send("Server Error");

        if (result.rows.length === 0) {
            emitter.emit("logs", `User tried to see the user with id ${id} but not found at ${date}`);
            return res.status(404).send(`User with id ${id} Not Found`);
        }
        if (Object.keys(updatedDetail).length === 0) {
        return res.status(200).send(`nothing updated with id ${id}`)
    }
    if (updatedDetail.password) {
        const setRounds = 10;
        updatedDetail.password = await bcrypt.hash(updatedDetail.password, setRounds);
    }

    updateUser(id, updatedDetail, (err, respond) => {
        if (err) {
            if (err.code === '23505') {
                emitter.emit("logs", `User tried to update with exist emails field at ${date}`);
                return res.status(400).send("Email already exists");
            }
            return res.status(500).send("Server error");
        }

        res.status(200).send(`User with id ${id} Updated successfully`);
        emitter.emit("logs", `User with id ${id} Updated successfully at ${date}`);

    });
    });
    
};

module.exports = { createUser, getAllUsers, getUserById, deleteUserById, updatingUser, };