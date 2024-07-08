import Controller from "./js/controller";
import "./styles.css"
import "./task-pane.css"
import "./detail-pane.css"
import "./sidebar.css"
import "./todo.css"
import {ProjectList} from "./js/project-list";
import View from "./js/view";


document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new ProjectList())
    controller.initialise();
})