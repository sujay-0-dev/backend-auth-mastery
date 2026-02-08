const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');


router.post("/",requireAuth, async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Login required" });
  }

  const todo = await Todo.create({
    title: req.body.title,
    user: req.session.userId,
  });

  res.status(201).json(todo);
});

// Get all to-do items
router.get('/',requireAuth, async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).send('Error fetching to-do items');
    }
});

//GET to-do items for logged in user
router.get('/user/me', requireAuth, async (req, res) => {
    try {
        const todos = await Todo.find().where('user').equals(req.session.userId);
        res.json(todos);
    } catch (error) {
        res.status(500).send('Error fetching user to-do items');
    }
});

// Get a specific to-do item for specific user
router.get('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id).where('user').equals(req.session.userId);
        if (!todo) {
            return res.status(404).json({ message: "To-do item not found" });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).send('Error fetching to-do item');
    }
});

// Update a to-do item
router.put('/:id',requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "To-do item not found" });
        }
        if (todo.user.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const updatedToDo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );
        res.json(updatedToDo);
    } catch (error) {
        res.status(500).send('Error updating to-do item');
    }
});

// Delete a to-do item
router.delete('/:id',requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "To-do item not found" });
        }
        if (todo.user.toString() !== req.session.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'To-do item deleted' });
    } catch (error) {
        res.status(500).send('Error deleting to-do item');
    }
});

module.exports = router;