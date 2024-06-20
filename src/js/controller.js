import ProjectList, { defaultLists} from "./project-list";
import { Todo } from "./todo";
import {addToLocalStorage, getProjectsFromLocalStorage} from "./local-storage";
import { mousedownResizeHandler } from './resize'
import { createSortable } from "./sortbable";
import {ProjectInput} from "../components/newProjectInput";
import View from "./view";
import Project from "./Project";


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
    if(storageObj === null) storageObj = defaultLists
    storageObj.forEach( project => {
        let newProject = new Project(project.name, project.id)
        project.todoList.forEach(todo => newProject.todoList.push(new Todo(todo.title, todo.id))
        )
        this.projects.addProject(newProject)
    })

}

Controller.prototype.handleAddNewTodo = function(todo){
    this.selectedProject.todoList.push(new Todo(todo))
    this.view.renderTodoList(this.selectedProject.todoList)
    addToLocalStorage(this.projects.getAllProjects())
}

Controller.prototype.handleAddNewProject = function(project) {
    this.projects.addProject(new Project(project))
    console.log(this.projects.getAllProjects())
    this.view.renderProjectList(this.projects.getAllProjects());
    addToLocalStorage(this.projects.getAllProjects())
}

Controller.prototype.setActiveProject = function(projectId) {
    this.selectedProject = this.projects.getProject(projectId)
    this.view.renderTodoList(this.selectedProject.todoList)
}