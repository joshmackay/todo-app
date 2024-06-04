import { Todo } from "./todo"

export class TodoList{
    todos = [];
    todoCount = 0;

    constructor(todos){
        this.todos = todos;
        this.todoCount = todos.length;
    }

    createTodo(todo) {
        this.todos.push(todo);
        this.todoCount++

    }

    getTodo(id) {
        return this.todos.filter((todo) => todo.id === id);
    }

    getTodoList(){
        return this.todos;
    }

    getTodoCount(){
        return this.todoCount;
    }

    updateTodo(todo) {
        let todoIndex = this.todos.indexOf(todo);
        this.todos[todoIndex] = todo;
    }

    deleteTodo(todo) {
        let todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
    }
}


