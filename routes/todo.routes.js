import express from 'express';
import { createTodo } from '../controllers/todo.controller.js';

const route = express.Router();

route.get('/', (req, res) => {
    res.send('Todo API is running');
});

// Create TODO
route.post('/add', createTodo);

export default route;