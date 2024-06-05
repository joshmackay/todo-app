import {createTodo, Todo} from "./todo";
import {TodoListEntry} from "../components/TodoListEntry";
import {list} from "postcss";
import {createProjectList} from "./project-list";
import {getTodos} from "./local-storage";
import {createTodoList, TodoList} from "./todolist";
import { mousedownResizeHandler, mouseResizeMoveHandler, mouseUpResizeHandler } from './resize'

const todoInput = document.getElementById("todo-input");
const appContainer = document.getElementById("app-container");
const taskListPane  = document.getElementById("task-list");
const dragger = document.getElementById('dragger');
const detailPane = document.getElementById('detail-pane')
export const todoListElement = document.getElementById("todo-list");

const projectList = createProjectList();
const storedItems = getTodos();
const todoList = createTodoList(storedItems);

todoList.getTodoList().forEach((item) => {
    console.log(item);
    const newTodo = createTodo(item.title, item.id, item.description, item.priority, item.dueDate, item.listId);
    renderTodoElement(newTodo);
})

todoInput.addEventListener('keypress', function (event){
    if(event.key === "Enter"){
        addNewTodo();
    }
})

dragger.addEventListener('mousedown', (e) => mousedownResizeHandler(e, taskListPane, appContainer));