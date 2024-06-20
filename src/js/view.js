
import {TodoListEntry} from "../components/TodoListEntry";
import {mousedownResizeHandler} from "./resize";

export default function View() {

    //get DOM elements
    this.appContainer = document.getElementById("app-container");
    this.todoMenu = document.getElementById('menu-todo-date');
    this.taskListPane = document.getElementById("task-list");
    this.detailPane = document.getElementById('detail-pane')
    this.todoInput = document.getElementById("todo-input");
    this.resizeHandle = document.getElementById('resize-handle');
    this.todoListElement = document.getElementById("todo-list");
    this.projectListSidebar = document.getElementById('menu-todo-project');
    this.projectControls = document.getElementById('new-project-controls')
    this.addProjectBtn = document.getElementById('add-project-btn');
    this.projectInput = document.getElementById('project-input')
    this.projectList = document.getElementById('project-list');

    this.bindAddTodo = function(handler){
        this.todoInput.addEventListener('keypress', function (event) {
            console.log(this)
            if (event.key === "Enter" && this.value.toString().trim() !== "") {
                handler(this.value);
                this.value = "";
            }
        })
    }

    this.bindAddProject = function(handler){
        this.addProjectBtn.addEventListener('click', (event) => {
            this.projectControls.classList.remove('hidden')
        });
        this.projectInput.addEventListener('keypress', (event) => {
            if(event.key === "Enter" && this.projectInput.value.toString().trim() !== ""){
                handler(this.projectInput.value);
                this.projectInput.value = "";
                this.projectControls.classList.add('hidden')
            }
        })
    }

    this.setEventListeners = function () {
        //

        //projectControls.addEventListener('click', newProjectHandler)

        this.resizeHandle.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));

        // this.todoInput.addEventListener('keypress', function (event) {
        //     if (event.key === "Enter" && this.todoInput.value.trim() !== "") {
        //         addNewTodo(this.todoInput.value);
        //         this.todoInput.value = "";
        //     }
        // })
    }

    this.renderProjectList = function(projectList) {
        this.projectList.innerHTML = ""
        for (let i = 0; i < projectList.length; i++) {
            let item = document.createElement('li');
            item.classList.add('project-list-item')
            item.setAttribute('data-id', projectList[i].id)
            item.innerHTML = projectList[i].name
            item.addEventListener('click', (e) => {
                let projectId = e.target.getAttribute('data-id')
                if(this.projectClickHandler){
                    this.projectClickHandler(projectId)
                }
            })
            this.projectList.appendChild(item)
        }
    }

    this.bindProjectClickHandler = function(handler){
        this.projectClickHandler = handler;
    }

    this.renderTodoList = function(list) {
        this.todoListElement.innerHTML = ""
        for (let i = 0; i < list.length; i++) {
            const item = TodoListEntry(list[i]);
            this.todoListElement.appendChild(item)
        }
    }

    this.changeActiveProject = function(e, handler){
        let projectId = e.target
        console.log(projectId)
    }
}





