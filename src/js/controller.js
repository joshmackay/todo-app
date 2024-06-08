import ProjectList, { createProjectList } from "./project-list";
import { createTodoList } from "./todolist";
import { createTodo } from "./todo";
import {getTodos, addToLocalStorage, getOrder, getProjectList, getProjectsFromLocalStorage} from "./local-storage";
import { mousedownResizeHandler } from './resize'
import { renderTodoList, renderTodoElement } from "./view";
import { createSortable } from "./sortbable";

//get DOM elements
const appContainer = document.getElementById("app-container");
const todoMenu = document.getElementById('menu-todo-date');
const taskListPane = document.getElementById("task-list");
const detailPane = document.getElementById('detail-pane')
const todoInput = document.getElementById("todo-input");
const dragger = document.getElementById('dragger');
const todoListElement = document.getElementById("todo-list");
const projectMenu = document.getElementById('menu-todo-project');

let projectList = new ProjectList();

//initialise app, called from page load event
export default function init() {
    projectList = loadData();

    todoInput.addEventListener('keypress', function (event) {
        if (event.key === "Enter" && todoInput.value.trim() !== "") {
            addNewTodo();
            todoInput.value = "";
        }
    })

    //const sortable = createSortable(todoListElement);
    //const sortOrder = sortable.options.store.get(sortable)
    dragger.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));
}

function loadData(){
    const storedProjects = getProjectsFromLocalStorage();

    storedProjects.forEach(project => {
        let 
    })

}

export function addNewTodo(todoTitle){
    let newTodo = createTodo(todoTitle);
    todoList.createTodo(newTodo)
    addToLocalStorage(todoList.getTodoList())
    renderTodoElement(todoListElement, newTodo);
}