import { Todo } from "./todo";
import Project from "./project";

export default function ProjectList() {
    let _projects = []

    this.getAllProjects = () => {
        return _projects;
    }

    this.getProject = (id) => {
        return _projects.find((project) => project.id === id);
    }

    this.addProject = (project) => {
        _projects.push(project);
    }

    this.addRange = (projectList) => {
        projectList.forEach(project => this.addProject(project))
    }

    this.removeProject = (toRemove) => {
        _projects = _projects.filter(project => project.id !== toRemove.id);
    }

    this.updateProject = (project) => {
        const listIndex = _projects.indexOf(project);
        _projects[listIndex] = project;
    }

    this.addTodo = (project, title) => {
        _projects.find(item => item.id === project.id).todoList.push(new Todo(title));
    }

    this.toJSON = function(){
        return _projects.map(project => project.toJSON())
    }
    
}

export const defaultLists = [
    {
        'name': 'Personal',
        'id': '1',
        'todoList': [
            {
                title: 'Get groceries',
                id: '1',
                projectId: 1
            },
            {
                title: 'Vaccuum',
                id: '2',
                projectId: 1
            },
            {
                title: 'Call mum',
                id: '3',
                projectId: 1
            }
        ]
    },
    {
        'name': 'Work',
        'id': '2',
        'todoList': [
            {
                title: 'Call Bill',
                id: '4',
                projectId: 2
            },
            {
                title: 'Pay rent',
                id: '5',
                projectId: 2
            },
            {
                title: 'Get money',
                id: '6',
                projectId: 2
            }
        ]
    },
    {
        'name': 'Play',
        'id': '3',
        'todoList': [
            {
                title: 'Something',
                id: '7',
                projectId: 3
            },
            {
                title: 'Something2',
                id: '8',
                projectId: 3
            },
            {
                title: 'Something3',
                id: '9',
                projectId: 3
            }
        ]
    }
]