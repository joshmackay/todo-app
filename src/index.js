import Controller from "./js/controller";
import "./styles.css"
import "./task-pane.css"
import "./detail-pane.css"
import "./sidebar.css"
import "./todo.css"
console.log('in')

document.addEventListener("DOMContentLoaded", () => {
    console.log("in again")
    const controller = new Controller()
    controller.initialise();
})