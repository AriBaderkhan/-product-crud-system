const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, deleteUserById, updatingUser } = require('../controllers/studentController');

router.post('/add', createUser);
router.get('/showall', getAllUsers);
router.get('/show/:id', getUserById);
router.delete('/delete/:id', deleteUserById);
router.put('/update/:id', updatingUser);

module.exports = router;
