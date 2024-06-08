import {TodoListEntry} from "../components/TodoListEntry";


export function renderTodoList(todoList){
    todoList.forEach(todo => {
        renderTodoElement(todo);
    })
}

export function renderTodoElement(listContainer, newTodo){
    let newElement = TodoListEntry(newTodo)
    newElement.addEventListener('mouseover', addHighlighted);
    newElement.addEventListener('mouseout', removeHighlighted);
    listContainer.appendChild(newElement)
}


