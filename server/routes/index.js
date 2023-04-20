var express = require('express');
const { getallTodoList, newTodo, deleteTodo, updateTodo, getOneTodo } = require('../controllers/todo.ctr');
const { verifyToken } = require('../middleware/auth');

var router = express.Router();

/* GET home page. */
router.get('/', getallTodoList);
router.post('/new', verifyToken, newTodo);
router.delete('/delete/:id', verifyToken, deleteTodo);
router.put('/update/:id', verifyToken, updateTodo);
router.get('/get/:id', verifyToken, getOneTodo);


module.exports = router;
