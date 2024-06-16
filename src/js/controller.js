import ProjectList, { defaultLists} from "./project-list";
import { Todo } from "./todo";
import {addToLocalStorage } from "./local-storage";
import { mousedownResizeHandler } from './resize'
import * as view from "./view";
import { createSortable } from "./sortbable";
import {ProjectInput} from "../components/newProjectInput";
import {renderProjectList, renderTodoList} from "./view";


//get DOM elements
const appContainer = document.getElementById("app-container");
const todoMenu = document.getElementById('menu-todo-date');
const taskListPane = document.getElementById("task-list");
const detailPane = document.getElementById('detail-pane')
const todoInput = document.getElementById("todo-input");
const resizeHandle = document.getElementById('resize-handle');
const todoListElement = document.getElementById("todo-list");
const projectListSidebar = document.getElementById('menu-todo-project');
const projectControls = document.getElementById('new-project-controls')
const addProjectBtn = document.getElementById('add-project-btn');
const projectInput = document.getElementById('project-input')
const projectList = document.getElementById('project-list');

let projects = new ProjectList();
let selectedProject = null;

//initialise app, called from page load event
export function init() {

    setEventListeners();
    selectedProject = projects.getAllProjects()[0]
    renderProjectList(projects.getAllProjects())
    renderTodoList(selectedProject.todoList)
    //view.renderTodoList(selectedProject.todoList.getTodoList())

    //const sortable = createSortable(todoListElement);
    //const sortOrder = sortable.options.store.get(sortable)
}

function loadData() {
    // const storedProjects = getProjectsFromLocalStorage();
    //
    // storedProjects.forEach(project => {
    //     let
    // })
}

function addNewProject() {
    projectControls.classList.remove('hidden')
    // let test = new ProjectInput()
    // console.log(test)
    //
    // projectList.appendChild(test)
}

function addNewTodo(todoTitle) {
    projects.addTodo(selectedProject, todoTitle)
    //addToLocalStorage(todoList.getTodoList())
    renderTodoList(selectedProject.todoList);
    console.log(selectedProject.todoList)
}

function setEventListeners() {
    addProjectBtn.addEventListener('click', addNewProject);

    //projectControls.addEventListener('click', newProjectHandler)

    projectInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter" && projectInput.value.trim() !== "") {
            projectInput.classList.toggle('hidden')
        }
    })

    resizeHandle.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));

    todoInput.addEventListener('keypress', function (event) {
        if (event.key === "Enter" && todoInput.value.trim() !== "") {
            addNewTodo(todoInput.value);
            todoInput.value = "";
        }
    })
}

// function newProjectHandler(e) {
//     if (e.target.id === 'new-project-cancel') {
//         projectControls.classList.toggle('hidden')
//     }
// }


