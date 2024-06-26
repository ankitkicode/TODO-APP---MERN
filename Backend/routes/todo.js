const express = require('express');
const router = express.Router();
const createTodo = require('../controllers/todo/createTodo');
const getTodo = require('../controllers/todo/getTodo');
const deleteTodo = require('../controllers/todo/tododelete');
const updateTodo = require('../controllers/todo/updatetodo');
const IsAuth = require('../middlewares/isAuth');
const verifyUser = require('../middlewares/verifyUser');
const todoModel = require('../model/todos');


router.get('/', IsAuth, getTodo);
router.post('/create', IsAuth, createTodo);
router.put('/update/:id', updateTodo);
router.get('/delete/:id', IsAuth, verifyUser, deleteTodo);
router.get('/todofind/:id', IsAuth, verifyUser, async (req, res) => {
    const id = req.params.id;
    const todo = await todoModel.findById(id);
    res.status(200).json({todo});
});

module.exports = router;