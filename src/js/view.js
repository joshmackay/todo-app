
import {TodoListEntry} from "../components/TodoListEntry";
import {mousedownResizeHandler} from "./resize";

export default function View() {

    //get DOM elements
    const appContainer = document.getElementById("app-container");
    const todoMenu = document.getElementById('menu-todo-date');
    const taskListPane = document.getElementById("task-list");
    const detailPane = document.getElementById('detail-pane')
    const todoInputContainer = document.getElementById('task-input-container')
    const todoInput = document.getElementById("todo-input");
    const dateInput = document.getElementById('todo-date-input')
    const todoListElement = document.getElementById("todo-list");
    const projectListSidebar = document.getElementById('menu-todo-project');
    const projectControls = document.getElementById('new-project-controls')
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectInput = document.getElementById('project-input')
    const projectListElement = document.getElementById('project-list');
    const priorityContainer = document.getElementById('priority-container')
    const priorityModal = document.getElementById('priority-modal')
    const priorityButton = document.getElementById('priority-button')
    const priorityToggle = document.getElementById('priority-container')
    const priorityItems = document.getElementsByClassName('priority-item')
    const allTodoInputs = document.getElementsByClassName('todo-input-control')
    const todoInputIcons = document.querySelectorAll('.todo-input-icon')

    let projectClickHandler = null

    this.bindAddTodo = function(handler){
        todoInput.addEventListener('keypress', function (event) {
            if (event.key === "Enter" && this.value.toString().trim() !== "") {
                let date = dateInput.value ? new Date(dateInput.value) : null
                handler(this.value, date);
                this.value = "";
                dateInput.value = ""
            }
        })
    }

    this.bindAddProject = function(handler){
        addProjectBtn.addEventListener('click', (event) => {
            projectControls.classList.remove('hidden')
        });
        projectInput.addEventListener('keypress', (event) => {
            if(event.key === "Enter" && projectInput.value.toString().trim() !== ""){
                handler(this.value);
                this.value = "";
                this.classList.add('hidden')
            }
        })
    }

    this.setEventListeners = function () {
        Array.from(allTodoInputs).forEach(input => {
            toggleTodoContainerHighlights(input);
        })

        priorityButton.addEventListener('click', togglePriorityModal)

        document.addEventListener('click', togglePriorityModal)

        resizeHandle.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));

        // this.todoInput.addEventListener('keypress', function (event) {
        //     if (event.key === "Enter" && this.todoInput.value.trim() !== "") {
        //         addNewTodo(this.todoInput.value);
        //         this.todoInput.value = "";
        //     }
        // })
    }

    const toggleTodoContainerHighlights = function(input){
        if(input.matches('#priority-button')){
            input.addEventListener('click', () => {
                priorityButton.classList.toggle('active-icon')
            })
        }

        input.addEventListener('focus', function() {

            document.getElementById('task-input-container').classList.add('focused')
            if(input.matches('#todo-date-input')){
                document.getElementById('todo-date-icon').classList.add('active-icon')
            }
        })
        input.addEventListener('focusout', function(){
            document.getElementById('task-input-container').classList.remove('focused')
            if(input.matches('#todo-date-input')){
                document.getElementById('todo-date-icon').classList.remove('active-icon')
            }
        })
    }
    const togglePriorityModal = function(e){
        if(!todoInputContainer.contains(e.target) && priorityModal.classList.contains('show')){
            priorityModal.classList.toggle('show')
            priorityButton.classList.remove('active-icon')
            return
        }
        if(!todoInputContainer.contains(e.target) && !priorityModal.classList.contains('show')){
            priorityButton.classList.add('active-icon')
            priorityModal.classList.toggle('show')
        }

    }

    this.renderProjectList = function(projectList) {
        projectListElement.innerHTML = ""
        for (let i = 0; i < projectList.length; i++) {
            let item = document.createElement('li');
            item.classList.add('project-list-item')
            item.setAttribute('data-id', projectList[i].id)
            item.innerHTML = projectList[i].name
            item.addEventListener('click', (e) => {
                let projectId = e.target.getAttribute('data-id')
                if(projectClickHandler){
                    projectClickHandler(projectId)
                }
            })
            projectListElement.appendChild(item)
        }
    }

    this.bindProjectClickHandler = function(handler){
        projectClickHandler = handler;
    }

    this.renderTodoList = function(list) {
        todoListElement.innerHTML = ""
        for (let i = 0; i < list.length; i++) {
            const item = TodoListEntry(list[i]);
            todoListElement.appendChild(item)
        }
    }

    this.changeActiveProject = function(e, handler){
        let projectId = e.target
    }
}





