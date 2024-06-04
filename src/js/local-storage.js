
export function getOrder(){
    return localStorage.getItem("order") || []

}

export function getTodos(){
    return JSON.parse(localStorage.getItem("todoList")) || []
}

export function addToLocalStorage(todoList){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
