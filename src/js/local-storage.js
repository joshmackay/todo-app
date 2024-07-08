import ProjectList from "./project-list";


export function addToLocalStorage(projectList){
    localStorage.setItem("todoList", JSON.stringify(projectList.toJSON()));
}

export function getProjectsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("todoList")) || null
}

// export function getOrder(){
//     return localStorage.getItem("order") || []
// }
