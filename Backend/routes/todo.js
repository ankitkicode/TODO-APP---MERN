const express = require('express');
const router = express.Router();
const createTodo = require('../controllers/todo/createTodo');
const getTodo = require('../controllers/todo/getTodo');
const deleteTodo = require('../controllers/todo/tododelete');
const updateTodo = require('../controllers/todo/updatetodo');
const IsAuth = require('../middlewares/isAuth');
const verifyUser = require('../middlewares/verifyUser');


router.get('/',IsAuth, getTodo);
router.get('/create',IsAuth, createTodo);
router.get('/update/:id',IsAuth,verifyUser, updateTodo);
router.get('/delete/:id',IsAuth, verifyUser, deleteTodo);

module.exports = router;