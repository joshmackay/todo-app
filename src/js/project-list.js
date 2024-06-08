export default function ProjectList() {
    this.projects = []

    this.getAll = () => {
        return this.projects;
    },

    this.getProject = (id) => {
        return this.projects.find((project) => project.id === id);
    },

    this.addProject = (project) => {
        return this.projects.push(project);
    },

    this.removeProject = (toRemove) => {
        return this.projects.filter(project => project.id === toRemove.id);
    },

    this.updateProject = (project) => {
        const listIndex = this.projects.indexOf(project);
        this.projects[listIndex] = project;
    }

}