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

    this.removeProject = (toRemove) => {
        _projects = _projects.filter(project => project.id !== toRemove.id);
    }

    this.updateProject = (project) => {
        const listIndex = _projects.indexOf(project);
        _projects[listIndex] = project;
    }

    this.toJSON = function(){
        return _projects.map(project => project.toJSON())
    }
    
}

export const defaultLists = [
    {
        "name": "Personal",
        "id": "1",
        "todoList": [
            {
                "title": "Yoga Session",
                "id": "1",
                "projectId": 1,
                "dueDate": "04/07/2024",
                "priority": "medium",
                "description": "Attend a 1-hour yoga session at the local studio to relax and unwind."
            },
            {
                "title": "Bake a Cake",
                "id": "2",
                "projectId": 1,
                "dueDate": "05/07/2024",
                "priority": "low",
                "description": "Bake a chocolate cake for the family gathering this weekend."
            },
            {
                "title": "Call Aunt Lisa",
                "id": "3",
                "projectId": 1,
                "dueDate": "08/07/2024",
                "priority": "high",
                "description": "Catch up with Aunt Lisa to discuss holiday plans and family updates."
            }
        ]
    },
    {
        "name": "Work",
        "id": "2",
        "todoList": [
            {
                "title": "Client Proposal",
                "id": "4",
                "projectId": 2,
                "dueDate": "04/07/2024",
                "priority": "high",
                "description": "Draft and send the proposal to the new client for the upcoming project."
            },
            {
                "title": "Team Meeting",
                "id": "5",
                "projectId": 2,
                "dueDate": "12/07/2024",
                "priority": "medium",
                "description": "Schedule and attend the weekly team meeting to discuss project progress."
            },
            {
                "title": "Code Review",
                "id": "6",
                "projectId": 2,
                "dueDate": "21/07/2024",
                "priority": "low",
                "description": "Review the latest code commits and provide feedback to the development team."
            }
        ]
    },
    {
        "name": "Leisure",
        "id": "3",
        "todoList": [
            {
                "title": "Hiking Adventure",
                "id": "7",
                "projectId": 3,
                "dueDate": "04/12/2024",
                "priority": "high",
                "description": "Plan and embark on a hiking trip to the nearby mountains for a day of exploration."
            },
            {
                "title": "Board Game Night",
                "id": "8",
                "projectId": 3,
                "dueDate": "04/12/2024",
                "priority": "medium",
                "description": "Organize a board game night with friends and family, featuring your favorite games."
            },
            {
                "title": "Movie Marathon",
                "id": "9",
                "projectId": 3,
                "dueDate": "04/12/2024",
                "priority": "none",
                "description": "Plan a movie marathon with a selection of classic and new films to enjoy over the weekend."
            }
        ]
    }
]
