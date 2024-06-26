
import {TodoListEntry} from "../components/TodoListEntry";
import {mousedownResizeHandler} from "./resize";

export default function View() {

    //get DOM elements
    let appContainer = document.getElementById("app-container");
    let todoMenu = document.getElementById('menu-todo-date');
    let taskListPane = document.getElementById("task-list");
    let detailPane = document.getElementById('detail-pane')
    let todoInput = document.getElementById("todo-input");
    let dateInput = document.getElementById('todo-date-input')
    let resizeHandle = document.getElementById('resize-handle');
    let todoListElement = document.getElementById("todo-list");
    let projectListSidebar = document.getElementById('menu-todo-project');
    let projectControls = document.getElementById('new-project-controls')
    let addProjectBtn = document.getElementById('add-project-btn');
    let projectInput = document.getElementById('project-input')
    let projectListElement = document.getElementById('project-list');
    let priorityModal = document.getElementById('priority-modal')
    const priorityButton = document.getElementById('priority-button')
    const priorityToggle = document.getElementById('priority-container')
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

        priorityButton.addEventListener('click', togglePriorityModal)
        document.addEventListener('click', hideModal)
        resizeHandle.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));

        // this.todoInput.addEventListener('keypress', function (event) {
        //     if (event.key === "Enter" && this.todoInput.value.trim() !== "") {
        //         addNewTodo(this.todoInput.value);
        //         this.todoInput.value = "";
        //     }
        // })
    }

    const hideModal = function(e){
        let modal = document.getElementById('priority-modal')
        if(!e.target.matches('#priority-button') || !e.target.matches('#priority-modal')){
            //priorityModal.classList.remove('show')
            //
        }
    }

    const togglePriorityModal = function(e){
        if(!priorityModal.classList.contains('show')){
            priorityModal.classList.add('show')
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





