const express = require('express');
const { Todo } = require('../models/todo');
const router = express.Router();
const requireAuthRoute = require('../middlewares/requireAuthRoute');
router.post("/", requireAuthRoute, async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(401).json({ message: "Title is Required!" });
        }
        const todo = await Todo.create({
            title,
            userId: req.userId
        });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: "error message", error: err.message });
    }
});

router.get("/", requireAuthRoute, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "error message", error: err.message });
    }
});

router.put("/:id", requireAuthRoute, async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, completed },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: "error message", error: err.message });
    }
});
router.delete("/:id", requireAuthRoute, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "error message", error: err.message });
    }
});

module.exports = router;