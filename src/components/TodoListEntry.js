import createElement from "../helpers/createElement";

export function TodoListEntry(todo){
    const todoElement = document.createElement('li');
    const checkbox = document.createElement("input");
    const textContainer = document.createElement('div');
    const text = document.createElement('span');
    const handle = document.createElement('div');

    todoElement.classList.add('todo-item');
    todoElement.setAttribute('data-id', todo.id);

    textContainer.classList.add('todo-item-text')

    checkbox.setAttribute('type', 'checkbox');

    checkbox.classList.add('bg-transparent', 'rounded-sm', 'hover:cursor-pointer')
    handle.innerHTML = '\u{283F}'
    handle.classList.add('my-handle');
    text.innerText = todo.title;
    text.classList.add('item' )

    todoElement.appendChild(checkbox);
    todoElement.appendChild(textContainer);
    todoElement.appendChild(handle);
    textContainer.appendChild(text);

    return todoElement;
}