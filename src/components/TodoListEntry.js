import createElement from "../helpers/createElement";

export function TodoListEntry(todo){
    const todoElement = document.createElement('li');
    const checkbox = document.createElement("input");
    const textContainer = document.createElement('div');
    const text = document.createElement('span');
    const handle = document.createElement('div');


    todoElement.classList.add(
        'todo-item',
        'flex',
        'gap-[16px]',
        'w-full',
        'h-[40px]',
        'px-[18px]',
        //'hover:bg-[rgb(255,255,255,0.06)]',
        'items-center',
        'rounded-[8px]',
        'relative',
        'will-change-transform',
    );

    todoElement.setAttribute('data-id', todo.id);

    textContainer.classList.add(
        'todo-item-text',
        'w-full',
        'h-full',
        'text-slate-300',
        'hover:border-solid',
        'border-b',
        'border-[rgb(255,255,255,0.06)]',
        'hover:border-transparent',
        'flex',
        'items-center',
    )

    handle.classList.add(
        'text-white',
        'cursor-grab'
    )

    checkbox.setAttribute('type', 'checkbox');

    checkbox.classList.add('bg-transparent', 'rounded-sm', 'hover:cursor-pointer')
    handle.innerHTML = '\u{283F}'
    handle.classList.add('my-handle');
    text.innerText = todo.title;
    text.classList.add('item', )




    todoElement.appendChild(checkbox);
    todoElement.appendChild(textContainer);
    todoElement.appendChild(handle);
    textContainer.appendChild(text);

    return todoElement;
}