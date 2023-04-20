const asynHandler = require("express-async-handler");
const Todo = require("../models/Todo");
const User = require("../models/user");
const getallTodoList = asynHandler(async (req, res) => {
    try {
        const todo = await Todo.find()
        return res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error)
    }
});
const newTodo = asynHandler(async (req, res) => {
    try {
        const { text, photo } = req.body;

        if (!text || !photo)
            return res.status(400).json({ msg: "Please fill in all fields." });
        const newTodList = new Todo({
            ...req.body,
            postedBy: req.user,
        });
        await newTodList.save();

        res.status(200).json({ newTodList });
    } catch (error) {
        res.status(500).json(error);
    }
});


const deleteTodo = asynHandler(async (req, res) => {
    try {
        const todo = await Todo.findByIdAndRemove({ _id: req.params.id });
        res.status(200).json("deleted successfully");
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }


})
const getOneTodo = asynHandler(async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }


})


const updateTodo = asynHandler(async (req, res) => {
    try {
        const todo = await Todo.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ todo, message: "success" });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = {
    getallTodoList, newTodo, deleteTodo, getOneTodo, updateTodo
}