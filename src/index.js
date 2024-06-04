
import * as storage from "./js/local-storage"
import "./styles.css"
import {ProjectList} from "./js/project-list"
import { TodoList } from "./js/todolist"
import { Todo } from "./js/todo";
import {getTodos, addToLocalStorage, getOrder} from "./js/local-storage";
import Sortable from "sortablejs";
import {TodoListEntry} from "./components/TodoListEntry";

const todoInput = document.getElementById("todo-input");
const appContainer = document.getElementById("app-container");
const taskListPane  = document.getElementById("task-list");
const dragger = document.getElementById('dragger');
const detailPane = document.getElementById('detail-pane')
export const todoListElement = document.getElementById("todo-list");

const projectList = new ProjectList();

let storedItems = getTodos();
//let storedOrder = getOrder();
console.log(storedItems);

let todoList = new TodoList(storedItems);

todoList.todos.forEach((item) => {
    console.log(item);
    const newTodo = new Todo(item.title, item.id, item.description, item.priority, item.dueDate, item.listId);
    renderTodoElement(newTodo);
})

todoInput.addEventListener('keypress', function (event){
    if(event.key === "Enter"){
        addNewTodo();
    }
})

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

const sortable = new Sortable.create(todoListElement, {
    draggable: '.todo-item',
    sort: true,
    handle: '.my-handle',
    forceFallback: true,
    fallbackOnBody: true,
    group: 'order',
    dataIdAttr: 'data-id',
    store: {
        get: function (sortableList) {
            let order = localStorage.getItem(sortableList.options.group.name);
            return order ? order.split('|') : [];
        },
        set: function (sortableList) {
            let order = sortableList.toArray();
            localStorage.setItem(sortableList.options.group.name, order.join('|'));
        }
    }
})

const sortOrder = sortable.options.store.get(sortable)
console.log(sortOrder)

let mousePosXResizer = 0;
let mousePosYResizer = 0;
let taskListContainerWidth = 0;
let draggableItem = null

//pane resizer event handlers
function mousedownResizeHandler(e){
    //get current mouse position
    mousePosXResizer = e.clientX;
    mousePosYResizer = e.clientY;
    taskListContainerWidth = taskListPane.getBoundingClientRect().width;

    document.addEventListener('mousemove', mouseResizeMoveHandler)
    document.addEventListener('mouseup', mouseUpResizeHandler)
}

function mouseResizeMoveHandler(e){
    let dx = e.clientX - mousePosXResizer;
    let dy = e.clientY - mousePosYResizer;
    taskListPane.style.width = `${((taskListContainerWidth + dx) *100)/appContainer.getBoundingClientRect().width}%`
}

function mouseUpResizeHandler(e){
    document.removeEventListener('mousemove', mouseResizeMoveHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler)
}

dragger.addEventListener('mousedown', mousedownResizeHandler)



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