import Sortable from "sortablejs";


let todoListContainer = null;
let draggableItem = null;

export function createSortable(element) {
    return new Sortable.create(element, {
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
}

export function setSortableHandlers(todoListEle, draggableItemEle){
    todoListContainer = todoListEle;
    draggableItem = draggableItemEle;
    document.addEventListener('mousedown', sortableMouseDownHandler)
    document.addEventListener('mouseup', sortableMouseUpHandler)
}

function sortableMouseDownHandler(e){
    if(e.target.closest('.my-handle')){

        let listItems = todoListContainer.getElementsByClassName('todo-item') || []
        for(let i = 0; i < listItems.length; i++){

            if(listItems[i].classList.contains('todo-item')){
                listItems[i].removeEventListener('mouseover', addHighlighted);
            }

            if(listItems[i].classList.contains('sortable-drag')){
                listItems[i].classList.add('highlighted');
            }
        }
        document.addEventListener('mousemove', () => setDraggableItem(e, draggableItem))
    }
}

function sortableMouseUpHandler(e){
    if(draggableItem !== null){
        let listItems = todoListElement.getElementsByClassName('todo-item');
        for(let i = 0; i < listItems.length; i++){
            if(listItems[i].classList.contains('todo-item')){
                listItems[i].addEventListener('mouseover', addHighlighted);
            }
        }
        draggableItem = null;
    }
}

function setDraggableItem(){
    if(draggableItem === null){
        draggableItem = document.querySelector('.sortable-drag')
    }
    document.removeEventListener('mousemove', setDraggableItem)
}

export function addHighlighted(e) {
    e.target.closest('.todo-item').classList.add('highlighted');
}

export function removeHighlighted(e) {
    e.target.closest('.todo-item').classList.remove('highlighted');
}