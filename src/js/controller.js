import ProjectList, { defaultLists} from "./project-list";
import { Todo } from "./todo";
import {addToLocalStorage, getProjectsFromLocalStorage} from "./local-storage";
import { mousedownResizeHandler } from './resize'
import { createSortable } from "./sortbable";
import {ProjectInput} from "../components/newProjectInput";
import View from "./view";
import Project from "./Project";
import { formatISO } from "date-fns";


export default function Controller() {


    this.view = new View();
    this.projects = new ProjectList();
    this.selectedProject = null;

    this.handleAddNewTodo = this.handleAddNewTodo.bind(this)
    this.view.bindAddTodo(this.handleAddNewTodo)

    this.handleAddNewProject = this.handleAddNewProject.bind(this)
    this.view.bindAddProject(this.handleAddNewProject)

    this.view.bindProjectClickHandler(this.setActiveProject.bind(this))

    this.handleAddNewProject = this.handleAddNewProject.bind(this)

    this.initialise = () => {
        this.getProjects()
        this.selectedProject = this.projects.getAllProjects()[0]

        this.view.setEventListeners();
        //this.selectedProject = this.projects.getAllProjects()[0]
        this.view.renderProjectList(this.projects.getAllProjects())
        console.log('first render')
        this.view.renderTodoList(this.selectedProject.todoList)

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
}

Controller.prototype.getProjects = function(){
    let storageObj = getProjectsFromLocalStorage()
    console.log(storageObj)
    if(storageObj === null) storageObj = defaultLists
    storageObj.forEach( project => {
        let newProject = new Project(project.name, project.id)
        project.todoList.forEach(todo => {
            newProject.addTodo(new Todo(
                todo.title,
                todo.id,
                project.id,
                todo.dueDate,
                todo.priority))
        })
        this.projects.addProject(newProject)
    })
    this.setActiveProject(this.projects.getAllProjects()[0].id)
}

Controller.prototype.handleAddNewTodo = function(todoName, todoDate, todoPriority = null){
    let newTodo = new Todo(todoName, 0, this.selectedProject.id, todoDate ? formatISO(todoDate) : null, todoPriority)
    this.selectedProject.addTodo(newTodo)
    this.view.renderTodoList(this.selectedProject.todoList)
    addToLocalStorage(this.projects)
    console.log(this.selectedProject.todoList)
}

Controller.prototype.handleAddNewProject = function(project) {
    this.projects.addProject(new Project(project))
    console.log(this.projects.getAllProjects())
    this.view.renderProjectList(this.projects.getAllProjects());
    addToLocalStorage(this.projects)
}

Controller.prototype.setActiveProject = function(projectId) {
    this.selectedProject = this.projects.getProject(projectId)
    this.view.renderTodoList(this.selectedProject.todoList)
}