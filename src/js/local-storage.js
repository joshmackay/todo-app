import ProjectList from "./project-list";


export function addToLocalStorage(projectList){
    localStorage.setItem("todoList", JSON.stringify(projectList));
}

export function getProjectsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("todoList")) || new ProjectList()
}

// export function getOrder(){
//     return localStorage.getItem("order") || []
// }
