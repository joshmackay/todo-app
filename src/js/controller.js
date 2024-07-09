import {defaultLists, ProjectList} from "./project-list";
import { Todo } from "./todo";
import {addToLocalStorage, getProjectsFromLocalStorage} from "./local-storage";
import { mousedownResizeHandler } from './resize'
import {createSortable, setSortableHandlers} from "./sortbable";
import {ProjectInput} from "../components/newProjectInput";
import View from "./view";
import {Project} from "./Project";
import { format } from "date-fns";

export default function Controller(view, projectList) {


    this.view = view;
    this.projects = projectList;
    this.selectedProject = null;
    this.selectedTodo = null
    this.sortable = null

    this.handleAddNewTodo = this.handleAddNewTodo.bind(this)
    this.view.bindAddTodo(this.handleAddNewTodo)

    this.setActiveTodo = this.setActiveTodo.bind(this)
    this.view.selectTodoHandler(this.setActiveTodo)

    this.view.completeTodoHandler = this.handleCompleteTodo.bind(this)

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
        this.setActiveTodo()

        this.view.setEventListeners();
        //this.selectedProject = this.projects.getAllProjects()[0]
        this.view.renderProjectList(this.projects.getAllProjects())
        this.view.renderTodoDetails(this.selectedTodo)
    }

}

Controller.prototype.getProjects = function(){
    let storageObj = getProjectsFromLocalStorage()
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
    this.view.renderTodoList(this.selectedProject)
    addToLocalStorage(this.projects)
    this.setSortable()
}

Controller.prototype.handleAddNewProject = function(project) {
    this.projects.addProject(new Project(project))
    this.view.renderProjectList(this.sortable);
    addToLocalStorage(this.projects)
}

Controller.prototype.setActiveProject = function(projectId = null) {
    this.sortable = null

    if(projectId === null){
        this.selectedProject = this.projects.getAllProjects()[0]
        return
    }

    this.selectedProject = this.projects.getProject(projectId)
    this.view.renderTodoList(this.selectedProject)
    this.setActiveTodo(this.selectedProject.getFirstTodo())
    this.setSortable()
    console.log(this.sortable)
}

Controller.prototype.setSortable = function() {
    this.sortable = createSortable(this.selectedProject, this.view.getTodoListElement())
}

Controller.prototype.setActiveTodo = function(todo = null){
    if(todo == null){
        let firstTodo = this.selectedProject.getFirstTodo()
        console.log(firstTodo)
        if(firstTodo === null){
            this.view.renderTodoDetails()
        }
        else{
            this.view.renderTodoDetails(firstTodo)
        }
    }
    else{
        this.selectedTodo = this.selectedProject.getTodo(todo.id);
        this.view.renderTodoDetails(this.selectedTodo)
    }

}

Controller.prototype.deleteTodoHandler = function(){
    this.selectedProject.deleteTodo(this.selectedTodo)
    this.setActiveTodo()
    addToLocalStorage(this.projects)
    this.view.renderTodoList(this.selectedProject)
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
    this.view.renderTodoList(this.selectedProject)
}

Controller.prototype.handleCompleteTodo = function(todo){
    this.selectedTodo = todo
    this.view.fadeTodo(todo)
    setTimeout(this.deleteTodoHandler, 500 )
}