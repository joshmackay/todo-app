
import {TodoListEntry} from "../components/TodoListEntry";

export function showNewProjectControls(){

}

// export function renderTodoList(todoList){
//     todoList.forEach(todo => {
//         renderTodoElement(todo);
//     })
// }

export function setProject(){

}

export function renderProjectList(projectList){
    const listElement = document.getElementById('project-list');
    for(let i = 0; i < projectList.length; i++){
        let item = document.createElement('li');
        item.innerHTML = projectList[i].name
        listElement.appendChild(item)
    }
}

export function renderTodoList(list){
    const element = document.getElementById('todo-list');
    element.innerHTML = ""
    for(let i = 0; i < list.length; i++){
        const item = TodoListEntry(list[i]);
        element.appendChild(item)
    }
}

// export function renderTodoElement(listContainer, newTodo){
//     let newElement = TodoListEntry(newTodo)
//     newElement.addEventListener('mouseover', addHighlighted);
//     newElement.addEventListener('mouseout', removeHighlighted);
//     listContainer.appendChild(newElement)
// }
