
import {TodoListEntry} from "../components/TodoListEntry";
import {mousedownResizeHandler} from "./resize";
import {format, formatISO} from "date-fns"


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

    const menuPrioritySelect = document.getElementsByClassName('menu-priority-item')
    const projectListSidebar = document.getElementById('menu-todo-project');
    const projectControls = document.getElementById('new-project-controls')
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectInput = document.getElementById('project-input')
    const projectListElement = document.getElementById('project-list');
    const saveNewProjectBtn = document.getElementById('new-project-add')
    const cancelNewProjectBtn = document.getElementById('new-project-cancel')
    const deleteProject = document.getElementById('delete-project-button')

    const priorityContainer = document.getElementById('priority-container')
    const priorityModal = document.getElementById('priority-modal')
    const priorityButton = document.getElementById('priority-button')
    const priorityToggle = document.getElementById('priority-container')
    const priorityItems = document.getElementsByClassName('priority-item')

    const allTodoInputs = document.getElementsByClassName('todo-input-control')
    const todoInputIcons = document.querySelectorAll('.todo-input-icon')

    const detailTitle = document.getElementById('todo-title')
    const detailDate = document.getElementById('todo-date')
    const detailPriority = document.getElementById('todo-priority')
    const detailDescription = document.getElementById('todo-description')
    const deleteButton = document.getElementById('delete-button')
    const editButton = document.getElementById('edit-button')

    const modal = document.getElementById('modal')
    const editModal = document.getElementById('edit-modal')
    const editSave = document.getElementById('edit-save')
    const editCancel = document.getElementById('edit-cancel')

    const modalTitleInput = document.getElementById('name-input')
    const modalDateInput = document.getElementById('date-input')
    const modalPriorityInput = document.getElementById('priority-input')
    const modalDescriptionInput = document.getElementById('description-input')

    const resizeHandle = document.getElementById('resize-handle')
    let projectClickHandler = null
    let selectTodoHandler = null

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
        saveNewProjectBtn.addEventListener('click', (event) => {
            if(projectInput.value.toString().trim() !== ""){
                handler(projectInput.value);
                projectInput.value = "";
                projectControls.classList.add('hidden')
            }
        })
        cancelNewProjectBtn.addEventListener('click', event => {
            projectInput.value = "";
            projectControls.classList.add('hidden')
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

        editButton.addEventListener('click', this.toggleEditModal)
        editCancel.addEventListener('click', this.toggleEditModal)

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

    this.renderTodoList = (project) => {
        todoListElement.setAttribute('data-projectId', project.id)
        let listContainer = document.getElementById('todo-list-container')
        listContainer.innerHTML = ""
        let newList = document.createElement('ul')
        newList.id = 'todo-list'
        listContainer.appendChild(newList)
        for (let i = 0; i < project.todoList.length; i++) {
            const item = TodoListEntry(project.todoList[i]);
            item.addEventListener('click', () => selectTodoHandler(project.todoList[i]) )
            newList.appendChild(item)
        }

    }

    this.selectTodoHandler = function(handler){
        selectTodoHandler = handler
    }

    this.renderTodoDetails = function(todo = null){
        if(todo !== null) {
            detailTitle.innerHTML = todo.title
            detailDate.innerHTML =  todo.dueDate
            detailPriority.innerHTML = todo.priority
            detailDescription.innerHTML = todo.description
        }
        else{
            detailTitle.innerHTML = "Please add a new todo"
            detailDate.innerHTML =  ""
            detailPriority.innerHTML = ""
            detailDescription.innerHTML = ""
        }
    }


    this.deleteSelectedTodo = function(handler){
        deleteButton.addEventListener('click', handler)
    }

    this.toggleEditModal = function(){
        modal.classList.toggle('show')
        if(modal.classList.contains('show'))
            renderEditModal()
    }

    this.bindEditTodo = function(handler){
        editSave.addEventListener('click', event => {
            handler(modalTitleInput.value, modalDateInput.value, modalPriorityInput.value, modalDescriptionInput.value)
        })
    }

    const renderEditModal = function(){
        modalTitleInput.value = detailTitle.innerText
        modalDateInput.value = formatDate(detailDate.innerText)
        modalPriorityInput.value = detailPriority.innerText
        modalDescriptionInput.value = detailDescription.innerText


    }

    this.bindDeleteProject = function(handler){
        deleteProject.addEventListener('click', event =>{
            handler();
        })
    }

    const formatDate = function(date){
        console.log(date)
        let parts = date.split('/')
        let day = parts[0]
        let month = parts[1]
        let year = parts[2]

        if(day.length === 1) day ='0' + day;
        if(month.length === 1) month = '0' + month

        return `${year}-${month}-${day}`
    }

    this.getTodoListElement = function(){
        return document.getElementById('todo-list')
    }
}





