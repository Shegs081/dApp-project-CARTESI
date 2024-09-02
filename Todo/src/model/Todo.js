import crypto from 'node:crypto';

export const TodoPriority = {
    low: 'low',
    medium: 'medium',
    high: 'high',
};

export class Todo {
    id;
    createdAt;
    title;
    description;
    dueDate;
    priority;
    completed;

    /**
     * ### Todo model
     * @requires title: string {*}
     * @param {*} description string
     * @param {*} dueDate Date
     * @param {*} priority low | medium | high
     */
    constructor({ title, description, dueDate, priority }) {
        this.id = crypto.randomUUID();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;

        if (priority && TodoPriority[priority]) {
            this.priority = TodoPriority[priority];
        } else if (priority && !TodoPriority[priority]) {
            throw { error: 'Invalid priority.' };
        } else {
            this.priority = TodoPriority.medium; // Default priority
        }
    }

    complete() {
        this.completed = true;
    }

    /**
     * ### Todo getData
     * @description return todo basic data.
     * @returns {*}
     * todo {
     *   id: UUID
     *   createdAt: number
     *   title: string
     *   description: string
     *   dueDate: Date
     *   priority: low | medium | high
     *   completed: boolean
     * }
     */
    getData() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            completed: this.completed,
        };
    }
}