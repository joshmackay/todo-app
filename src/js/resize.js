//pane resizer event handlers

let mousePosXResizer = 0;
let mousePosYResizer = 0;
let taskListContainerWidth = 0;
let isMouseDown = false;
let appWidth = document.getElementById('app-container').getBoundingClientRect().width
let sideBarWidth = document.getElementById('sidebar').getBoundingClientRect().width
let details = document.getElementById('detail-pane')
let handleWidth = document.getElementById('resize-handle').getBoundingClientRect().width
export function mousedownResizeHandler(e, taskListPane, appContainer){
    //get current mouse position
    isMouseDown = true;
    if(e.target.closest('#resize-handle') === false) {
        isMouseDown = false;
        return
    }
    mousePosXResizer = e.clientX;
    mousePosYResizer = e.clientY;
    taskListContainerWidth = taskListPane.getBoundingClientRect().width;
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', (e) => mouseResizeMoveHandler(e, taskListPane, appContainer));
    document.addEventListener('mouseup', mouseUpResizeHandler)
}

function mouseResizeMoveHandler(e, taskListPane, appContainer){

    if(!isMouseDown) return
    let dx = e.clientX - mousePosXResizer;
    let dy = e.clientY - mousePosYResizer;
    taskListPane.style.width = `${((taskListContainerWidth + dx) *100)/appContainer.getBoundingClientRect().width}%`
    details.style.width = `${appWidth - sideBarWidth - taskListPane.getBoundingClientRect().width - handleWidth}px`
}

function mouseUpResizeHandler(e){
    document.body.classList.remove('no-select')
    document.removeEventListener('mousemove', mouseResizeMoveHandler)
    document.removeEventListener('mouseup', mouseUpResizeHandler)
    isMouseDown = false;
}




