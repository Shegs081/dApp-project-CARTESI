import { TodoController } from './todo';

const todoController = new TodoController();

export const controller = {
    createTodo: todoController.createTodo.bind(todoController),
    getAllTodos: todoController.getAllTodos.bind(todoController),
    getTodoById: todoController.getTodoById.bind(todoController),
    completeTodo: todoController.completeTodo.bind(todoController),
    deleteTodo: todoController.deleteTodo.bind(todoController),
};
