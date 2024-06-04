export class ProjectList {
    #projects = []

    constructor() {

    }

    getAll(){
        return this.#projects;
    }

    getProject(id){
        return this.#projects.find((project) => project.id === id);
    }

    addProject(project){
        this.#projects.push(project);
    }

    removeProject(toRemove){
        this.#projects = this.#projects.filter(project => project.id === toRemove.id);
    }

    updateProject(project){
        const listIndex = this.#projects.indexOf(project);
        this.#projects[listIndex] = project;
    }
}