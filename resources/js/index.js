import TaskService from "./github/TaskService.js";
import TaskView from "./ui/TaskView.js";

function renderTasks(tasks) {
  tasks.forEach(task => {
    TaskView.append(task);
  });
}

TaskView.setRoot(document.querySelector(".tasks"));
TaskService.loadTasks("OOP-Shorts").then(renderTasks);