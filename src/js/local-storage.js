import ProjectList from "./project-list";


export function addToLocalStorage(projectList){
    console.log(projectList.toJSON())
    localStorage.setItem("todoList", JSON.stringify(projectList.toJSON()));
}

export function getProjectsFromLocalStorage(){
    return JSON.parse(localStorage.getItem("todoList")) || null
}

// export function getOrder(){
//     return localStorage.getItem("order") || []
// }
