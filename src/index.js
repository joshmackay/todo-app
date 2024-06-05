
import * as storage from "./js/local-storage"
import "./styles.css"
import {ProjectList} from "./js/project-list"
import { TodoList } from "./js/todolist"
import { createTodo } from "./js/todo";
import {getTodos, addToLocalStorage, getOrder} from "./js/local-storage";
import Sortable from "sortablejs";
import {TodoListEntry} from "./components/TodoListEntry";





function addNewTodo(){
    if(todoInput.value === "") {
        return
    }
    let newTodo = new Todo(todoInput.value);
    todoList.createTodo(newTodo)
    addToLocalStorage(todoList.getTodoList())
    renderTodoElement(newTodo);
    todoInput.value = "";
}



const sortOrder = sortable.options.store.get(sortable)
console.log(sortOrder)

//todo drag event handlers
document.addEventListener('mousedown', (e) => {

    if(e.target.closest('.my-handle')){

        let listItems = todoListElement.getElementsByClassName('todo-item') || []
        for(let i = 0; i < listItems.length; i++){

            if(listItems[i].classList.contains('todo-item')){
                listItems[i].removeEventListener('mouseover', addHighlighted);
            }

            if(listItems[i].classList.contains('sortable-drag')){
                listItems[i].classList.add('highlighted');
            }
        }
        document.addEventListener('mousemove', setDraggableItem)
    }
})

function setDraggableItem(){
    if(draggableItem === null){
        draggableItem = document.querySelector('.sortable-drag')
    }
    document.
    document.removeEventListener('mousemove', setDraggableItem)
}

document.addEventListener('mouseup', (e) => {
    if(draggableItem !== null){
        let listItems = todoListElement.getElementsByClassName('todo-item');
        for(let i = 0; i < listItems.length; i++){
            if(listItems[i].classList.contains('todo-item')){
                listItems[i].addEventListener('mouseover', addHighlighted);
            }
        }
        draggableItem = null;
    }
})

function addHighlighted(e) {
    e.target.closest('.todo-item').classList.add('highlighted');
}

function removeHighlighted(e) {
    e.target.closest('.todo-item').classList.remove('highlighted');
}


//add todo list items


function renderTodoElement(newTodo){
    let newElement = TodoListEntry(newTodo)
    newElement.addEventListener('mouseover', addHighlighted);
    newElement.addEventListener('mouseout', removeHighlighted);
    todoListElement.appendChild(newElement)
}

//sidebar

const todoMenu = document.getElementById('menu-todo-date');
const projectMenu = document.getElementById('menu-todo-project');



export { renderTodoElement }