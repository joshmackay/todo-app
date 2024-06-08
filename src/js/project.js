import TodoList from "./todolist";

export function Project(name, list = new TodoList()){

    this.name = name,
    this.todoList = list

}