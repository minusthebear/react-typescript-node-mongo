"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const getTodos = async (req, res) => {
    try {
        const todos = await todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
};
exports.getTodos = getTodos;
const addTodo = async (req, res) => {
    try {
        console.log(req.body);
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        console.log('line 25');
        console.log(todo);
        const newTodo = await todo.save();
        console.log('line 27');
        const allTodos = await todo_1.default.find();
        console.log('line 29');
        res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos });
    }
    catch (error) {
        throw error;
    }
};
exports.addTodo = addTodo;
const updateTodo = async (req, res) => {
    try {
        const { params: { id }, body, } = req;
        const updateTodo = await todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = await todo_1.default.find();
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = await todo_1.default.find();
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
};
exports.deleteTodo = deleteTodo;
