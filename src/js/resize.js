//pane resizer event handlers

let mousePosXResizer = 0;
let mousePosYResizer = 0;
let taskListContainerWidth = 0;
let draggableItem = null

export function mousedownResizeHandler(e, element, container){
    //get current mouse position
    mousePosXResizer = e.clientX;
    mousePosYResizer = e.clientY;
    taskListContainerWidth = element.getBoundingClientRect().width;

    document.addEventListener('mousemove', () => mouseResizeMoveHandler(element, container));
    document.addEventListener('mouseup', mouseUpResizeHandler)
}

export function mouseResizeMoveHandler(e, element, container){
    let dx = e.clientX - mousePosXResizer;
    let dy = e.clientY - mousePosYResizer;
    taskListPane.style.width = `${((taskListContainerWidth + dx) *100)/container.getBoundingClientRect().width}%`
}

export function mouseUpResizeHandler(e){
    document.removeEventListener('mousemove', mouseResizeMoveHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler)
}



