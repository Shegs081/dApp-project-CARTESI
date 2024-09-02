import { Todo } from '../model/todo';
import { RollupStateHandler } from '../shared/rollup-state-handler';
import { todoStorage } from '../storage/todo';

export class TodoController {
    async createTodo(data) {
        if (!data.title) {
            return await RollupStateHandler.handleReport({
                error: 'Todo title must be provided.',
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            const newTodo = new Todo(data.title, data.description, data.dueDate);
            todoStorage.addOne(newTodo);

            return {
                ok: true,
                message: 'Todo created successfully!',
                data: newTodo.getData(),
            };
        });
    }

    async getAllTodos() {
        return await RollupStateHandler.inspectWrapper(() =>
            todoStorage.getAll()
        );
    }

    async getTodoById(data) {
        const todoId = data[0];
        const todo = todoStorage.getOneById(todoId);

        if (!todo) {
            return await RollupStateHandler.handleReport({
                error: `Todo not found for id '${todoId}'.`,
            });
        }

        return await RollupStateHandler.inspectWrapper(() => todo.getData());
    }

    async completeTodo(data) {
        const todoId = data.id;
        const todo = todoStorage.getOneById(todoId);

        if (!todo) {
            return await RollupStateHandler.handleReport({
                error: `Todo not found for id '${todoId}'.`,
            });
        }

        return await RollupStateHandler.advanceWrapper(() => {
            todo.complete();
            todoStorage.updateOne(todo);

            return {
                ok: true,
                message: `Todo '${todo.id}' marked as completed!`,
                data: todo.getData(),
            };
        });
    }

    async deleteTodo(data) {
        const todoId = data.id;

        return await RollupStateHandler.advanceWrapper(() => {
            const deleted = todoStorage.deleteOne(todoId);

            if (deleted) {
                return {
                    ok: true,
                    message: `Todo '${todoId}' deleted successfully!`,
                };
            } else {
                return {
                    ok: false,
                    message: `Todo '${todoId}' not found or could not be deleted.`,
                };
            }
        });
    }
}