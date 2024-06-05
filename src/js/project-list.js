export function createProjectList() {
    const projects = []

    return {
        getAll: function () {
            return projects;
        },

        getProject: function (id) {
            return projects.find((project) => project.id === id);
        },

        addProject: function(project) {
            return projects.push(project);
        },

        removeProject: function(toRemove) {
            return projects.filter(project => project.id === toRemove.id);
        },

        updateProject: function(project) {
            const listIndex = projects.indexOf(project);
            projects[listIndex] = project;
        }
    }
}