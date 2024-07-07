import ProjectList, { defaultLists} from "./project-list";
import { Todo } from "./todo";
import {addToLocalStorage, getProjectsFromLocalStorage} from "./local-storage";
import { mousedownResizeHandler } from './resize'
import { createSortable } from "./sortbable";
import {ProjectInput} from "../components/newProjectInput";
import View from "./view";
import Project from "./Project";
import { format } from "date-fns";


export default function Controller() {


    this.view = new View();
    this.projects = new ProjectList();
    this.selectedProject = null;
    this.selectedTodo = null

    this.handleAddNewTodo = this.handleAddNewTodo.bind(this)
    this.view.bindAddTodo(this.handleAddNewTodo)

    this.setActiveTodo = this.setActiveTodo.bind(this)
    this.view.selectTodoHandler(this.setActiveTodo)

    this.handleAddNewProject = this.handleAddNewProject.bind(this)
    this.view.bindAddProject(this.handleAddNewProject)

    this.view.bindProjectClickHandler(this.setActiveProject.bind(this))

    this.deleteTodoHandler = this.deleteTodoHandler.bind(this)
    this.view.deleteSelectedTodo(this.deleteTodoHandler)

    this.view.bindEditTodo(this.handleEditTodo.bind(this))

    this.view.bindDeleteProject(this.handleDeleteProject.bind(this))

    this.initialise = () => {
        this.getProjects()
        if(this.projects.length === 0) return

        this.setActiveProject()
        console.log(this.selectedProject)
        this.setActiveTodo()
        this.view.setEventListeners();
        //this.selectedProject = this.projects.getAllProjects()[0]
        this.view.renderProjectList(this.projects.getAllProjects())

        this.view.renderTodoList(this.selectedProject.todoList)

        this.view.renderTodoDetails(this.selectedTodo)
        //const sortable = createSortable(todoListElement);
        //const sortOrder = sortable.options.store.get(sortable)
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
                todo.priority,
                todo.description))
        })
        this.projects.addProject(newProject)
    })
    this.setActiveProject(this.projects.getAllProjects()[0].id)
}

Controller.prototype.handleAddNewTodo = function(todoName, todoDate, todoPriority = null){
    let newTodo = new Todo(todoName, 0, this.selectedProject.id, todoDate ? format(todoDate, 'dd/MM/yyy') : null, todoPriority)
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

Controller.prototype.setActiveProject = function(projectId = null) {
    if(projectId === null){
        this.selectedProject = this.projects.getAllProjects()[0]
        return
    }
    this.selectedProject = this.projects.getProject(projectId)
    this.view.renderTodoList(this.selectedProject.todoList)
    this.setActiveTodo(this.selectedProject.getFirstTodo())
}

Controller.prototype.setActiveTodo = function(todo = null){
    console.log(todo)
    if(todo == null){
        this.view.renderTodoDetails()
        return
    }
    this.selectedTodo = this.selectedProject.getTodo(todo.id);
    this.view.renderTodoDetails(this.selectedTodo)
}

Controller.prototype.deleteTodoHandler = function(){
    this.selectedProject.deleteTodo(this.selectedTodo)
    addToLocalStorage(this.projects)
    this.view.renderTodoList(this.selectedProject.todoList)
    this.setActiveTodo(this.selectedProject.getFirstTodo().id)
    this.view.renderTodoDetails(this.selectedTodo)
}

Controller.prototype.handleEditTodo = function(title, todoDate , priority, description){
    this.selectedTodo.title = title
    this.selectedTodo.dueDate = todoDate ? format(todoDate, 'dd/MM/yyy') : null
    this.selectedTodo.priority = priority
    this.selectedTodo.description = description
    this.view.renderTodoDetails(this.selectedTodo)
    this.view.toggleEditModal()
}

Controller.prototype.handleDeleteProject = function(){
    this.projects.removeProject(this.selectedProject)
    addToLocalStorage(this.projects)
    this.setActiveProject()
    this.view.renderProjectList(this.projects.getAllProjects())
    this.view.renderTodoList(this.selectedProject.todoList)
}