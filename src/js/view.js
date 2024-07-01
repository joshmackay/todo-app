
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

    const deleteButton = document.getElementById('delete-button')
    const editButton = document.getElementById('edit-button')

    const resizeHandle = document.getElementById('resize-handle')
    let projectClickHandler = null

    this.bindAddTodo = function(handler){
        document.addEventListener('keypress', function (event) {
            if (todoInputContainer.classList.contains('focused') && event.key === "Enter" && todoInput.value.toString().trim() !== "") {
                let date = dateInput.value ? new Date(dateInput.value) : null
                handler(todoInput.value, date, todoInput.getAttribute('data-priority'));
                todoInput.value = "";
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
        document.addEventListener('click', togglePriorityModal)
        resizeHandle.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));

        Array.from(priorityItems).forEach( item => {
            item.addEventListener('click', setTodoPriority)
        })
    }

    const toggleTodoContainerHighlights = function(input){
        if(input.matches('#priority-button')){

            input.addEventListener('click', () => {
                todoInputContainer.classList.add('focused')
            })

            input.addEventListener('click', togglePriorityModal)
        }

        input.addEventListener('focus', function() {

            todoInputContainer.classList.add('focused')
            if(input.matches('#todo-date-input')){
                document.getElementById('todo-date-icon').classList.add('active-icon')
                priorityButton.classList.remove('active-icon')
            }
        })
        input.addEventListener('focusout', function(){
            todoInputContainer.classList.remove('focused')
            if(input.matches('#todo-date-input')){
                document.getElementById('todo-date-icon').classList.remove('active-icon')
                priorityButton.classList.remove('active-icon')
            }
        })

        document.addEventListener('click', (e) => {
            if(!todoInputContainer.contains(e.target)){
                priorityButton.classList.remove('active-icon')
                todoInputContainer.classList.remove('focused')
            }
        })
    }

    const togglePriorityModal = function(e){
        e.stopPropagation();
        if(this !== priorityButton){
            priorityModal.classList.remove('show')
        }
        else{
            priorityModal.classList.add('show')
        }
    }

    const setTodoPriority = function(){
        priorityButton.classList.remove(`priority-${todoInput.getAttribute('data-priority')}`)
        todoInput.setAttribute('data-priority', this.getAttribute('data-priority'))
        priorityButton.classList.add(`priority-${todoInput.getAttribute('data-priority')}`)
    }

    this.renderProjectList = (projectList) => {
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

    this.renderTodoList = (list) => {
        todoListElement.innerHTML = ""
        for (let i = 0; i < list.length; i++) {
            const item = TodoListEntry(list[i]);
            todoListElement.appendChild(item)
        }

    }

    this.changeActiveProject = function(e, handler){
        let projectId = e.target
    }

    this.renderTodoDetails = function(todo = null){
        console.log(todo)
        if(todo !== null) {
            console.log(todo)
            const todoTitle = document.getElementById('todo-title')
            const todoDate = document.getElementById('todo-date')
            const todoPriority = document.getElementById('todo-priority')
            const todoDescription = document.getElementById('todo-description')
            todoTitle.innerHTML = todo.title
            todoDate.innerHTML = todo.dueDate
            todoPriority.innerHTML = todo.priority
            todoDescription.innerHTML = todo.description === undefined ? '' : todo.description
        }
    }


    this.deleteSelectedTodo = function(handler){
        deleteButton.addEventListener('click', handler)
    }
}





