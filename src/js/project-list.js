import { Todo } from "./todo";
import Project from "./project";

export default function ProjectList() {
    let _projects = defaultLists

    this.getAllProjects = () => {
        return _projects;
    },

    this.getProject = (id) => {
        return _projects.find((project) => project.id === id);
    },

    this.addProject = (project) => {
        return _projects.push(project);
    },

    this.removeProject = (toRemove) => {
        _projects = _projects.filter(project => project.id !== toRemove.id);
    },

    this.updateProject = (project) => {
        const listIndex = _projects.indexOf(project);
        _projects[listIndex] = project;
    }

    this.addTodo = (project, title) => {
        const newTodo = new Todo(title)
        _projects.find(item => item.id === project.id).todoList.push(newTodo);
    }

    // this.getTodo = (project, id) => {
    //     return _todoList.filter((todo) => todo.id === id);
    // }
    //
    // this.updateTodo = (project, todo) => {
    //     let todoIndex = _projects.indexOf(todo);
    //     _todoList[todoIndex] = todo;
    // }
    //
    // this.deleteTodo = (todo) => {
    //     let todoIndex = _todoList.indexOf(todo);
    //     _todoList.splice(todoIndex, 1);
    // }

}

function initialiseDefaultLists(){

}

let defaultLists = [
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