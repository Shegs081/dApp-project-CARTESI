class TodoStorage {
    todos; 
    
    constructor() {
        this.todos = new Map();
    }

    addOne(todo) {
        this.todos.set(todo.id, todo);
    }

    getAll() {
        return Array.from(this.todos.values()).map(todo => todo.getData());
    }

    getOneById(id) {
        return this.todos.get(id);
    }

    updateOne(todo) {
        if (this.todos.has(todo.id)) {
            this.todos.set(todo.id, todo);
            return true;
        }
        return false;
    }

    deleteOne(id) {
        return this.todos.delete(id);
    }
}

export const todoStorage = new TodoStorage();