import Controller from "./js/controller";
import "./styles.css"
import "./task-pane.css"
import "./detail-pane.css"
import "./sidebar.css"
import "./todo.css"

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller()
    controller.initialise();
})