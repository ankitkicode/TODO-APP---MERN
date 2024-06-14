const express = require('express');
const router = express.Router();
const createTodo = require('../controllers/todo/createTodo');
const getTodo = require('../controllers/todo/getTodo');


router.post('/',getTodo);
router.post('/create',createTodo);

module.exports = router;