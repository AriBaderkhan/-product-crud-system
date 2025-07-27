const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, deleteUserById, updatingUser } = require('../controllers/studentController');
const {validateStudentAdd , validateStudentUpdate} = require('../validations/studentValidate')

router.post('/add', validateStudentAdd , createUser);
router.get('/showall', getAllUsers);
router.get('/show/:id', getUserById);
router.delete('/delete/:id', deleteUserById);
router.put('/update/:id',validateStudentUpdate, updatingUser);

module.exports = router;
