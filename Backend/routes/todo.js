const express = require('express');
const router = express.Router();
const createTodo = require('../controllers/todo/createTodo');
const getTodo = require('../controllers/todo/getTodo');
const deleteTodo = require('../controllers/todo/tododelete');


router.get('/',getTodo);
router.get('/create',createTodo);
router.get('/update/:id',createTodo);
router.get('/delete/:id',deleteTodo);

module.exports = router;