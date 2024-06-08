export default function TodoList(){
    this.todoList = [];

    this.addTodo = (todo) => {
        this.todoList.push(todo);
    }

    this.getTodo = (id) => {
        return this.todoList.filter((todo) => todo.id === id);
    }

    this.getTodoList = () => {
        return this.todoList;
    }

    this.updateTodo = (todo) => {
        let todoIndex = this.todoList.indexOf(todo);
        this.todoList[todoIndex] = todo;
    }

    this.deleteTodo = (todo) => {
        let todoIndex = this.todoList.indexOf(todo);
        this.todoList.splice(todoIndex, 1);
    }
}